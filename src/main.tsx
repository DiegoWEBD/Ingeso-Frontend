import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { NotificationProvider } from './presentation/components/generic_components/notifications/contexts/InformativeNotificationContext.tsx'
import { ENV_VARIABLES } from './presentation/utils/env_variables.ts'

createRoot(document.getElementById('root')!).render(
	<NotificationProvider>
		<GoogleOAuthProvider clientId={ENV_VARIABLES.GOOGLE_CLIENT_ID}>
			<App />
		</GoogleOAuthProvider>
	</NotificationProvider>
)
