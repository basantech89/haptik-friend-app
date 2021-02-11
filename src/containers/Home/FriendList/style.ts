import { makeStyles } from '@material-ui/core/styles'

export const useFriendListStyles = makeStyles(
	{
		form: {
			border: '1px solid rgba(0, 0, 0, 0.19)',
			borderTop: 'none'
		},
		box: {
			background: 'rgba(0, 0, 0, 0.09)',
			'& .MuiTypography-root': {
				paddingBottom: 0,
				fontWeight: 'bold',
				display: 'flex',
				alignItems: 'center'
			}
		},
		formControl: {
			minWidth: 120
		},
		list: {
			paddingTop: 0,
			paddingBottom: 0
		}
	},
	{
		name: 'FriendList'
	}
)

export const useListItemStyles = makeStyles({
	root: {
		// background: '#fff'
		'& .MuiTypography-root': {
			paddingBottom: 0
		}
	}
})
