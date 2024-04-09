import { getAccessToken, getProfileLS} from 'src/until/auth'
import { createContext, useState } from 'react'
import { User } from 'src/type/user.type'
// Context Api
// nó sẽ chạy trước khi f5 , nó bọc thẻ app

interface AppContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User| null
  setProfile :  React.Dispatch<React.SetStateAction<User | null>>
}
const initialAppContext: AppContextType = {
  // Boolen(null) : false
  isAuthenticated: Boolean(getAccessToken()),
  // ko làm j
  setIsAuthenticated: () => null,
  // trả về user | null
  profile: getProfileLS(),
  setProfile: () => null

}
export const Appcontext = createContext<AppContextType>(initialAppContext)
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // di chuột vô là lấy type
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile ] = useState<User | null>(initialAppContext.profile)
  // Lần 1 : profile rỗng sau khi đăng nhập thành công thì setProfile lại
  return <Appcontext.Provider value={{ isAuthenticated, setIsAuthenticated , profile , setProfile}}>{children}</Appcontext.Provider>
}
//  những thk childrent trong AppProvider use ContextApi dc
