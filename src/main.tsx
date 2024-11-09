import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './presentation/components/error/ErrorFallback.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
				<App />
			</GoogleOAuthProvider>
		</ErrorBoundary>
	</StrictMode>
)
