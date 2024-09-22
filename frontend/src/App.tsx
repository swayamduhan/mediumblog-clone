import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Blogs } from './pages/Blogs'
import './App.css'
import { Auth } from './pages/Auth'
import { Publish } from './pages/Publish'
import { Forgot } from './pages/Forgot'
import { BlogPage } from './pages/BlogPage'
import { Null } from './pages/Null'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Null path is only for dev  */}
          <Route path='/' element={<Null />} />  
          <Route path='/auth' element={<Auth />}/>
          <Route path='/auth/forgot' element={<Forgot />}/>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/publish' element={<Publish />}/>
          <Route path='/blog/:id' element={<BlogPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
