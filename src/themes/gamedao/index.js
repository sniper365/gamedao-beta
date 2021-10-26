import { createTheme } from '@mui/material/styles'

const globalTheme = {
	shape: {
		borderRadius: 1,
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true, // No more ripple, on the whole application 💣!
			},
		},
	},
}

export const darkTheme = createTheme({
	...globalTheme,
	palette: {
		mode: 'dark',
		primary: {
			main: '#f50057',
		},
		secondary: {
			main: '#3f51b5',
		},
	},
})

export const lightTheme = createTheme({
	...globalTheme,
	palette: {
		mode: 'light',
		primary: {
			main: '#f50057',
		},
		secondary: {
			main: '#3f51b5',
		},
	},
})