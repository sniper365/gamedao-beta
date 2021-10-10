import React, { useEffect, useState } from 'react'

import { useSubstrate } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp';

import {
	Container, Form, Divider, Segment, Image, Button, Radio
} from 'semantic-ui-react'

import faker from 'faker'
import { data, rnd } from '../lib/data'
import config from '../../config'

import {
	pinJSONToIPFS,
	pinFileToIPFS,
	gateway,
} from '../lib/ipfs'

const dev = config.dev
if (dev) console.log('dev mode')

const random_state = ( accountPair, campaigns = [] ) => {

	// version 0.1
	// get a random campaign id
	// create a random purpose
	// create random voting duration from 7, 14, 30, 60 days
	// create random amount to pay
	// or
	// voting without withdrawal ==> amount == 0

	const id = campaigns[campaigns.length]
	const purpose = faker.company.catchPhrase()
	const description = faker.company.catchPhrase()
	const cid = ''
	const amount = rnd( 10 ) * 100
	const duration = data.project_durations[ rnd(data.project_durations.length) ].value
	const proposer = accountPair.address
	const beneficiary = accountPair.address
	const voting_types = data.voting_types[ rnd(data.voting_types.length) ].value

	// TODO:
	// version > 0.2
	// create random additional data for ipfs
	// for proofs, extra info
	// select asset for withdrawal

	return {
		id, purpose, description, cid, amount, duration,
		proposer, beneficiary, voting_types
	}
}

// proposal (flow)
// 0.1 -> withdrawal votings
// 0.2 -> organisational votings
// 0.3 -> surveys

export const Main = props => {

	const { api } = useSubstrate()
	const { accountPair, finalized } = props
	const [ block, setBlock ] = useState(0)

	const [ loading, setLoading  ] = useState(false)
	const [ refresh, setRefresh  ] = useState(true)

	const [ formData, updateFormData ] = useState()
	const [ fileCID, updateFileCID ] = useState()
	const [ content, setContent ] = useState()

	// campaign or organisation?
	// actually you should select an organisation,
	// then an eventual campaign belonging to it.
	const [ entities, setEntities ] = useState([])

	useEffect(() => {

		if (!accountPair) return

		const query = async () => {
			try {
				const [
					memberships,
					contributions,
					successful,
				] = await Promise.all([
					api.query.gameDaoControl.memberships(accountPair.address),
					api.query.gameDaoCrowdfunding.campaignsContributed(accountPair.address),
					api.query.gameDaoCrowdfunding.campaignsByState(3),
				])
				const new_entities = new Array()
					// .concat(...memberships.toHuman())
					.concat(...contributions.toHuman())
					.concat(...successful.toHuman())
					.map((h,i)=>{
						return { key: i, text: h, value: h }
					})
				setEntities(new_entities)
			} catch ( err ) {
				console.error( err )
			}
		}
		query()

	}, [api, accountPair])

	//
	//
	//

	const getFromAcct = async () => {
		const { address, meta: { source, isInjected } } = accountPair
		let fromAcct
		if (isInjected) {
			const injected = await web3FromSource(source)
			fromAcct = address
			api.setSigner(injected.signer)
		} else {
			fromAcct = accountPair
		}
		return fromAcct
	}

	// form fields

	const handleOnChange = (e, { name, value }) =>
	updateFormData({ ...formData, [name]: value })

	// submit function

	const handleSubmit = e => {

		e.preventDefault()
		console.log('submit')

		setLoading(true)
		const content = {
			id: formData.id,
			description: formData.description
		}

		//

		const getCID = async () => {
			if (dev) console.log('1. upload content json')
			try {
				// TODO: pin...
				const cid = await pinJSONToIPFS( content )
				if ( cid ) {
					// setContentCID(cid)
					if (dev) console.log('json cid',`${gateway}${cid}`)
					sendTX(cid)
				}
			} catch ( err ) {
				console.log('Error uploading file: ', err)
			}
		}
		getCID()

		// send it

		const sendTX = async args => {

			if (dev) console.log('2. send tx')

			const expiry = ( formData.duration * data.blockFactor ) + block // take current block as offset
			const { id, purpose, cid, amount } = formData
			const payload = [
				id,
				purpose,
				cid,
				amount,
				expiry
			]
			const from = await getFromAcct()
			// TODO: refactor to have unified method name on module...
			const tx = api.tx.gameDaoGovernance.createProposal(...payload)
			const hash = await tx.signAndSend( from, ({ status, events }) => {
				if(events.length) {
					events.forEach((record) => {
						const { event } = record
						// const types = event.typeDef
						if (
							event.section === 'gameDaoGovernance' &&
							event.method === 'ProposalCreated'
						) {
							console.log('proposal created:', hash)
							setRefresh(true)
						}
					})
				}
			})
		}

	}

	const bestBlock = finalized
		? api.derive.chain.bestNumberFinalized
		: api.derive.chain.bestNumber

	useEffect(() => {

		let unsubscribe = null

		bestBlock(number => {
			setBlock(number.toNumber())
		})
		.then(unsub => {
			unsubscribe = unsub
		})
		.catch(console.error)

		return () => unsubscribe && unsubscribe()

	}, [bestBlock])

	useEffect(()=> {
		if(!refresh) return
		if (dev) console.log('refresh signal')
		updateFileCID(null)
		updateFormData( random_state( accountPair ) )
		setRefresh(false)
		setLoading(false)
	},[accountPair, refresh])

	// const campaigns = availableCampaigns.map((c,i)=>{
	// 	return { key: data.orgs.length + i, text: c, value: data.orgs.length + i }
	// })
	// const entities = { ...data.orgs, ...campaigns }

	if ( !formData ) return null

	return (
		<Segment vertical loading={loading}>
			<Form>
					<br/>
					<Divider clearing horizontal>General Information</Divider>
					<br/>

					<Form.Select
						fluid
						required
						label='Organization / Campaign'
						placeholder='Please select'
						name='entity'
						options={entities}
						value={formData.entity}
						onChange={handleOnChange}
						/>

					<Form.Group widths='equal'>
						<Form.Input
							fluid
							label='Proposal Title'
							placeholder='Title'
							name='purpose'
							value={formData.purpose}
							onChange={handleOnChange}
							required
							/>
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.TextArea
							label='Short Description'
							name='description'
							value={formData.description}
							placeholder='Tell us more'
							onChange={handleOnChange}
							/>
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Select
							fluid
							label='Voting Type'
							options={data.voting_types}
							name='voting_types'
							value={formData.voting_types}
							onChange={handleOnChange}
							/>
						<Form.Select
							fluid
							label='Proposal Duration'
							options={data.project_durations}
							placeholder='Duration'
							name='duration'
							value={formData.duration}
							onChange={handleOnChange}
							/>
					</Form.Group>

					<Form.Group widths='equal'>
						<Form.Select
							fluid
							disabled
							label='Collateral Type'
							options={data.collateral_types}
							name='collateral_types'
							value={formData.collateral_types}
							onChange={handleOnChange}
							/>
						<Form.Input
							fluid
							type='number'
							label='Collateral Amount'
							placeholder='amount'
							name='collateral_amount'
							value={formData.collateral_amount}
							onChange={handleOnChange}
							required
							/>
					</Form.Group>

					<Divider clearing horizontal>For Withdrawals and Grants</Divider>

					<Form.Group widths='equal'>
						<Form.Input
							fluid
							label='Amount to transfer on success'
							placeholder='amount'
							name='amount'
							value={formData.amount}
							onChange={handleOnChange}
							/>
						<Form.Input
							fluid
							label='Beneficiary Account'
							placeholder='Beneficiary'
							name='beneficiary'
							value={formData.beneficiary}
							onChange={handleOnChange}
							required
							/>
					</Form.Group>

					<Container textAlign='right'>

						<Button onClick={handleSubmit}>Publish Proposal</Button>

					</Container>
			</Form>
		</Segment>
	)

}

export default function Module (props) {

	const { accountPair } = props
	const { api } = useSubstrate()

	return api && api.query.gameDaoCrowdfunding && accountPair
		? <Main {...props} />
		: null

}

//
//
//