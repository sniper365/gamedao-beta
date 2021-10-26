import React from 'react'
import { Box, Typography, Container, List, Link as MUILink, Grid, ListItem, ListItemText } from '@mui/material'

const Link = ({ href, children }) => (
	<Typography variant="body" sx={{ fontSize: '1.25em' }}>
		<MUILink variant="inherit" href={href} target="_blank" underline="none" color="inherit">
			{children}
		</MUILink>
		<br />
	</Typography>
)

export const Footer = (props) => (
	<Box
		component="footer"
		sx={{
			py: '3em',
			px: '1em',
			mt: 'auto',

			fontSize: '.8em',

			color: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[100]),

			backgroundColor: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[900] : theme.palette.grey[900]),
		}}
	>
		<Container>
			<Grid spacing={1} columns={16}>
				<Grid container direction="Row" mb={4}>
					<Grid width={16}>
						<a href="#top">
							<img alt="GameDAO" src={`${process.env.PUBLIC_URL}/assets/gamedao_tangram.svg`} width={48} />
						</a>
					</Grid>
				</Grid>

				<Grid container direction="Row" mb={4}>
					<Grid xs={16} md={4} mb={4}>
						<Typography variant="h3" sx={{ fontSize: '1.5em', mb: '1em' }}>
							About
						</Typography>
						<Link href="https://blog.gamedao.co/the-gamedao-pinky-paper-8dcda7f2e1ca">short paper</Link>
						<Link href="https://blog.gamedao.co">blog</Link>
						<Link href="https://discord.gg/rhwtr7p">discord</Link>
						<Link href="https://twitter.com/gamedaoco">twitter</Link>
						<br />
						<Link href="https://gamedao.co">gamedao.co</Link>
					</Grid>
					<Grid xs={16} md={4} mb={4}>
						<Typography variant="h3" sx={{ fontSize: '1.5em', mb: '1em' }}>
							How we build
						</Typography>
						<Link as="a" href="https://zero.io">
							zero.io
						</Link>
						<Link as="a" href="https://substrate.dev">
							substrate.dev
						</Link>
						<Link as="a" href="https://kilt.io">
							kilt protocol
						</Link>
						<br />
						<Link as="a" href="https://github.com/gamedaoco">
							github
						</Link>
						<Link as="a" href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Falphaville.zero.io#/explorer">
							Polkadot Explorer
						</Link>
					</Grid>
					<Grid xs={16} md={8} mb={4}>
						<Typography variant="h3" sx={{ fontSize: '1.5em', mb: '1em' }}>
							GameDAO. For the Creator and Player Economy.
						</Typography>
						<Typography variant="body" sx={{ fontSize: '1.25em' }}>
							<p>
								Community driven ownership and creation will be a vital part of how we see video games in the near future. The transition to
								token driven economies is already in progress but is still in its early stages, only treating the symptoms of a broken,
								financial incentive driven sales machine.
							</p>
							<p>
								Tokenisation and community ownership need fair and transparent protocols to create safe environments for all participants
								working and creating together. Proper game theory needs to disincentivize bad actors and reward the good vibes of the community.
							</p>
							<p>
								From forging the initial idea over collaboration to fundraising and finally creating and operating game economies, we provide
								open protocols enabling coordination, ownership, fundraising and much more to sustainably improve economics of videogames,
								content creation and esports.
							</p>
						</Typography>
					</Grid>
				</Grid>

				<Grid container direction="Row">
					<Grid xs={16}>
						<Typography
							component="body"
							sx={{
								backgroundColor: 'transparent',
								fontSize: '0.75em',
								color: (theme) => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[100]),
							}}
						>
							{`© 2019-${new Date().getFullYear()} `}GAMEDAO CO. Powered by ZERO.IO
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	</Box>
)

export default Footer