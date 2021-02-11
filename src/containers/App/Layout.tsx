import React from 'react'
import { Container } from '@material-ui/core'
// import Footer from 'src/components/Footer'
import Header from '../../components/Header'
import { useLocalStorageState } from '../../utils/useLocalStorageState'
import { ThemeProvider } from '@material-ui/core/styles'
import themes from '../../themes'

const Layout: React.FC = (props) => {
	const [isLightTheme, setThemeMode] = useLocalStorageState(
		'isLightTheme',
		true
	)
	const theme = isLightTheme ? themes.light : themes.dark

	const toggleThemeMode = () => {
		setThemeMode(!isLightTheme)
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<Header onToggleThemeMode={toggleThemeMode} />
				<Container>{props.children as React.ReactChild}</Container>
				{/*<Footer />*/}
			</ThemeProvider>
		</>
	)
}

export default Layout
