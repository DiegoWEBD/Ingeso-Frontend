import axios from 'axios'
import { API_URL } from './utils'

// Create an Axios instance
const apiClient = axios.create({
	baseURL: API_URL, // Replace with your API base URL
	headers: {
		'Content-Type': 'application/json',
	},
})

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('access_token') // Adjust token storage as needed
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

// Add a response interceptor
apiClient.interceptors.response.use(
	(response) => response, // Pass through successful responses
	async (error) => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 || error.response.status === 403) &&
			!originalRequest._retry
		) {
			originalRequest._retry = true // Prevent infinite retries

			try {
				// Call the refresh token endpoint using GET
				const refreshToken = localStorage.getItem('refresh_token') // Adjust token storage as needed
				if (!refreshToken) {
					throw new Error('No refresh token available')
				}

				const refreshResponse = await axios.get(`${API_URL}/refresh`, {
					headers: {
						Authorization: `Bearer ${refreshToken}`,
					},
				})

				// Update the access token
				const newAccessToken = refreshResponse.data.access_token
				localStorage.setItem('access_token', newAccessToken)
				console.log('Token refreshed.')

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				return apiClient(originalRequest)
			} catch (refreshError) {
				// Handle token refresh failure (e.g., redirect to login)
				console.error('Token refresh failed:', refreshError)
				// Optional: Clear tokens and redirect to login
				localStorage.removeItem('access_token')
				localStorage.removeItem('refresh_token')
				window.location.href = '/login' // Adjust as needed
			}
		}

		return Promise.reject(error)
	}
)

export default apiClient
