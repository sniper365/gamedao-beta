import { Typography } from '@mui/material'
import * as React from 'react'
import { Paper, Card, Box, Divider, Stack, Slider } from './index'
import { styled } from '../components'

const Image = styled(Box)(({ theme }) => ({
	width: '100%',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center center',
	['&:after']: {
		display: 'block',
		content: '" "',
		paddingTop: '100%',
	},
}))

export const TileItem: React.FC<
	React.PropsWithChildren<{
		feature?: boolean
		imageURL: string
		metaHeadline: string
		headline: string
		progressValue?: number
		metaContent?: React.ReactNode
	}>
> = (props) => (
	<Card sx={{ minHeight: '100%', minWidth: '20%' }}>
		<Stack sx={{ height: '100%' }}>
			<Image sx={{ backgroundImage: `url(${props.imageURL})` }} />
			<Stack
				sx={{
					p: 2,
				}}
			>
				<Typography variant="h6">{props.metaHeadline}</Typography>
				<Typography variant="h4">
					{props.feature ? 'FEATURED:' : ''} {props.headline}
				</Typography>
				{props.children}
				{typeof props.progressValue === 'number' ? (
					<Slider disabled defaultValue={props.progressValue} />
				) : null}
			</Stack>
			<Box sx={{ flex: 1 }} />
			<Box sx={{ padding: 2, flex: 1 }}>{props.metaContent}</Box>
		</Stack>
	</Card>
)