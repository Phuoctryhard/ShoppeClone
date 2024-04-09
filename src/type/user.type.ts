// const user = {
//   roles: ['User'],
//   _id: '60c6f4eb4ea1de389f35605b',
//   email: 'user15@gmail.com',
//   createdAt: '2021-06-14T06:19:23.703Z',
//   updatedAt: '2021-06-14T06:19:23.703Z',
//   __v: 0
// }
// phân quyền roles : 
type Role = "Admin" | "User"
export interface User{
  roles: Role[];
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
// học đc mẹo làm nhanh  = cach di chuot toi user 

