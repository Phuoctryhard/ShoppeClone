import { ResponApi } from "./until.type";
import { User } from "./user.type";
// như 1 data 
export type AuthResponse = ResponApi<{
  access_token : string 
  expires : string 
  user?: User
}> 

/////////// Check 
// const autho : AuthResponse= {
//   message:"s",
//   data :{
//   }
// }
