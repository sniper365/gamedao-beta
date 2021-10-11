import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid, List } from '@mui/material';

export const Footer = (props) => (
      <Box
        component="footer"
        sx={{
          py: '3em',
          px: '1em',
          mt: 'auto',

          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[900]
              : theme.palette.grey[900],
        }}
      >

        <Container maxWidth="md">

				<Grid container spacing={2} columns={16}>

					<Grid direction="Row">
						<Grid width={16}>
							<a href="#top">
								<img alt="GameDAO" src={`${process.env.PUBLIC_URL}/assets/gamedao_tangram.svg`} width={32} />
							</a>
						</Grid>
					</Grid>

{/*


					<Grid.Row>
						<Grid.Column width={3}>
							<Typography variant="h4">About</Typography>
							<List link inverted>
								<List.Item as="a" href="https://blog.gamedao.co/the-gamedao-pinky-paper-8dcda7f2e1ca" target="_blank">
									short paper
								</List.Item>
								<List.Item as="a" href="https://blog.gamedao.co" target="_blank">
									blog
								</List.Item>
								<List.Item as="a" href="https://discord.gg/rhwtr7p" target="_blank">
									discord
								</List.Item>
								<List.Item as="a" href="https://twitter.com/gamedaoco" target="_blank">
									twitter
								</List.Item>
								<br />
								<List.Item as="a" href="https://gamedao.co" target="_blank">
									gamedao.co
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={3}>
							<Typography variant="h4">How we build</Typography>
							<List link inverted>
								<List.Item as="a" href="https://zero.io" target="_blank">
									zero.io
								</List.Item>
								<List.Item as="a" href="https://substrate.dev" target="_blank">
									substrate.dev
								</List.Item>
								<List.Item as="a" href="https://kilt.io" target="_blank">
									kilt protocol
								</List.Item>
								<br />
								<List.Item as="a" href="https://github.com/gamedaoco" target="_blank">
									github
								</List.Item>
								<List.Item as="a" href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Falphaville.zero.io#/explorer" target="_blank">
									Explorer
								</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={7}>
							<Typography variant="h4">GameDAO. For the Creator and Player Economy.</Typography>
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
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							<>&copy; 2019-2021 GAMEDAO CO. Running on ZERO.IO </>
						</Grid.Column>
					</Grid.Row>
		*/}

			</Grid>
		</Container>
	</Box>
)

export default Footer
