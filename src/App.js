import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import {BrowserRouter,Switch,Route, Routes} from 'react-router-dom'
import {AuthProvider} from './Context/AuthContext';
import Feed from './Components/Feed';
import Privateroute from './Components/Privateroute';
import Profile from './Components/Profile';
import Forget from './Components/Forget';
import Post from './Components/Posts';


function App() {
  return (
    <BrowserRouter>

    <AuthProvider>
    <Routes>
    <Route path="/Signup" element={[<Signup/>]}/>
    <Route path="/Login" element={[<Login/>]}/>
    <Route path="/Forget" element={[<Forget/>]}/>
    <Route path="/" element={<Privateroute  />}>
        <Route path="/" element={[<Feed/>]}/>
        <Route path="/Profile/:id" element={[<Profile/>]}/>
     </Route>
    </Routes>
    </AuthProvider>
    
    </BrowserRouter>
  
  );
}

export default App;
