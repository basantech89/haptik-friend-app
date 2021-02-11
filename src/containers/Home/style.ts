import { makeStyles } from '@material-ui/core/styles'

export const useHomeStyles = makeStyles(
	{
		root: {
			paddingTop: 50,
			'& .MuiTypography-root': {
				paddingBottom: 32
			}
		}
	},
	{
		name: 'Header'
	}
)
