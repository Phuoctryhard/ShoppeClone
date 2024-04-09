import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { Appcontext } from './context/app.context'
import { path } from './constants/path/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
// tên hook là useRouterElement
// return về 1 routerElements
function ProtectRoute() {
  // login : true , log out : false
  const { isAuthenticated } = useContext(Appcontext)

  // route đã login thì outlet , chưa login thì navigate login
  // true : sẽ đăng nhập -> outlet chứa children đã đăng nhập >< login
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
// >< ProtectRoute
function RejectedRoute() {
  // trường hợp false
  const { isAuthenticated } = useContext(Appcontext)
  // chưa login thì cho vào outLet , còn rồi thì trang sản phẩm
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouterElement() {
  const routerElements = useRoutes([
    {
      path: '',
      element: <ProtectRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/Register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: path.home,
      // nhận diện thằng nào là chính  index : true
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
  ])
  return routerElements
}
