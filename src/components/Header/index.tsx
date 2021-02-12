import * as React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { useAppHeaderStyles } from './style'
import { Link } from '@reach/router'
// import LightThemeIcon from '../../assets/icons/lightThemeIcon'
// import DarkThemeIcon from '../../assets/icons/darkThemeIcon'

// declare interface IAppHeaderProps {
// 	onToggleThemeMode: () => void
// }

const AppHeader = () => {
	const classes = useAppHeaderStyles()

	return (
		<AppBar position={'static'} elevation={0}>
			<Toolbar className={classes.toolbar}>
				<Link to='/' className={classes.title}>
					HAPTIK
				</Link>
				{/*<Button*/}
				{/*	className={classes.themeToggleButton}*/}
				{/*	onClick={props.onToggleThemeMode}*/}
				{/*>*/}
				{/*	<DarkThemeIcon />*/}
				{/*	<LightThemeIcon />*/}
				{/*</Button>*/}
			</Toolbar>
		</AppBar>
	)
}

export default AppHeader
