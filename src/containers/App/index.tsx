import React from 'react'
import Layout from './Layout'
import Routes from './Routes'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import store from '../../store'
import ErrorFallback from '../../components/ErrorFallback'

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Layout>
					<Routes />
				</Layout>
			</ErrorBoundary>
		</Provider>
	)
}

export default App
