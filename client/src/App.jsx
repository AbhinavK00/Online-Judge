import './App.css'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import { UserContextProvider } from './helper/userContext'
import { Compiler } from './pages/Comp'
import QuestionsList from './pages/QuestionsList'
import AddQuestions from './pages/AddQuestions'
import EditQuestions from './pages/EditQuestion'
import Dashboard from './pages/Dashboard'
import AdminOnly from './helper/AdminOnly'
import LoggedInOnly from './helper/LoggedInOnly'


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element = {<LoggedInOnly/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/comp/:id' element={<Compiler />} />
        </Route>

        <Route element={<AdminOnly />}>
          <Route path='/ques/list' element={<QuestionsList />} />
          <Route path='/ques/add' element={<AddQuestions />} />
          <Route path='/ques/update/:id' element={<EditQuestions />} />
        </Route>

      </Routes>
    </UserContextProvider>
  )
}