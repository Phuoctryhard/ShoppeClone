import { User } from 'src/type/user.type'

// lưu accessToken
export const saveAccessToken = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

// Clear accessToken
export const clearLS = () => {
  // localStorage.clear()
  localStorage.removeItem('access_token')
  localStorage.removeItem('access_token')
}
// ko có null
export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

// userName
export const getProfileLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileLS = (profile: User) => {
  //do profile : object
  localStorage.setItem('profile', JSON.stringify(profile))
}
