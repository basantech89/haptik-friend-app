import { fade, makeStyles } from '@material-ui/core/styles'

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
			minWidth: 173,
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			'& .MuiFormLabel-root': {
				position: 'unset',
				transform: 'none'
			},
			'& label + .MuiInput-formControl': {
				marginTop: 0
			},
			'& .MuiFormLabel-root.Mui-focused': {
				color: '#222831'
			},
			'& .MuiSelect-root': {
				minWidth: 48
			}
		},
		list: {
			paddingTop: 0,
			paddingBottom: 0
		},
		pagination: {
			position: 'fixed',
			bottom: 20,
			display: 'flex',
			justifyContent: 'center'
		}
	},
	{
		name: 'FriendList'
	}
)

export const useListItemStyles = makeStyles({
	root: {
		'& .MuiTypography-root': {
			paddingBottom: 0
		}
	}
})

export const useSearchStyles = makeStyles(
	(theme) => ({
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25)
			},
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(1),
				width: 'auto'
			}
		},
		searchIcon: {
			padding: theme.spacing(0, 2),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center'
		},
		inputRoot: {
			color: 'inherit'
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				width: '12ch',
				'&:focus': {
					width: '20ch'
				}
			}
		}
	}),
	{
		name: 'Search'
	}
)
