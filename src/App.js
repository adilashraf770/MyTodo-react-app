import './App.scss';
// Bootstrap JS
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Routes from './pages/Routes';
import AuthContextProvider from './context/AuthContext';
import './config/global'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
