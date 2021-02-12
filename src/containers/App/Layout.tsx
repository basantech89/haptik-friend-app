import React from 'react'
import { Container } from '@material-ui/core'
import Header from '../../components/Header'
import { ThemeProvider } from '@material-ui/core/styles'
import themes from '../../themes'

const Layout: React.FC = (props) => {
	const theme = themes.light

	return (
		<>
			<ThemeProvider theme={theme}>
				<Header />
				<Container>{props.children as React.ReactChild}</Container>
				{/*<Footer />*/}
			</ThemeProvider>
		</>
	)
}

export default Layout
