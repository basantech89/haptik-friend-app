import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { useHomeStyles } from './style'
import FriendList from './FriendList'

const Home: React.FC = () => {
	const homeClasses = useHomeStyles()

	return (
		<Container className={homeClasses.root}>
			<Typography variant='h2'> HAPTIK Friend App </Typography>
			<FriendList />
		</Container>
	)
}

export default Home
