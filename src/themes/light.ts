import { createMuiTheme } from '@material-ui/core'
import { IThemeOptions } from './types'
import colors from './colors'

const extended = {
	Header: {
		background: `linear-gradient(to top, ${colors.white.medium} 0%, ${colors.white.light} 100%)`,
		border: `1px solid ${colors.blue.light}`
	}
}

const theme = createMuiTheme({
	name: 'light',
	palette: {
		type: 'light',
		primary: {
			light: '#eeeeee',
			main: '#393e46',
			dark: '#222831'
		},
		secondary: {
			main: '#00adb5'
		}
	},
	typography: {
		fontFamily: [
			'Poppins',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	},
	cfg: extended
} as IThemeOptions)

export default theme
