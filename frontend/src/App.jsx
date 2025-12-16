import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuLateral from './components/MenuLateral';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <div className='app-container'>
      <MenuLateral />
      <div className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </div>
      
    </div>
      
    </BrowserRouter>
  )
}

export default App
