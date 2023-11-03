import { BrowserRouter, Route, Routes } from 'react-router-dom';

//styles
import './App.css'

//pages and components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import SignUp from './pages/signup/SignUp'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/create" element={<Create />}></Route>
                    <Route path="/projects/:id" element={<Project />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App
