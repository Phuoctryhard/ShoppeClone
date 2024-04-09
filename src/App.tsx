import './App.css'
import useRouterElement from './useRouterElement'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const element = useRouterElement()
  return <div className=''>{element}
    <ToastContainer />
  </div>
}

export default App
