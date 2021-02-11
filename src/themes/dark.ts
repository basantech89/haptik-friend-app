import { createMuiTheme } from '@material-ui/core'
import { IThemeOptions } from './types'
import colors from './colors'

const extended = {
	Header: {
		background: `linear-gradient(${colors.blue.dark}, ${colors.blue.medium})`,
		border: `1px solid ${colors.white.main}`
	}
}

const theme = createMuiTheme({
	name: 'dark',
	palette: {
		type: 'dark',
		primary: {
			main: '#FF0000'
		}
	},
	cfg: extended
} as IThemeOptions)

export default theme
