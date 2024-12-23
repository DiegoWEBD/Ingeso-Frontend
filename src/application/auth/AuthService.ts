export default interface AuthService {
	refresh: (refreshToken: string) => Promise<string>
}
