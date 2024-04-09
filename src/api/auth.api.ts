import { AuthResponse } from 'src/type/auth.type'
import http from 'src/until/http'

// export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)

// export const loginAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body)

// export const logout = () => http.post('/logout')

// đưa vô 1 object
const authAPI = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body),
  loginAccount: (body: { email: string; password: string }) => http.post<AuthResponse>('/login', body),
  logout: () => http.post('/logout')
}
export default authAPI

// http.post<AuthResponse>('/register', body) => có thể nhận đc :AuthResponse  đầy đủ dữ liệu trả về á gồm massage , data 
