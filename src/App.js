import logo from './logo.svg';
import './App.css';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import Signup from './components/register';
import Login from './components/login';
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/Signup' element={<Signup />}></Route>
        <Route exact path='/Login' element={<Login />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
