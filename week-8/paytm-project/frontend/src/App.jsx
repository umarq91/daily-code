
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Transfer from './pages/Transfer'
import Dashboard from './pages/Dashboard'
import SigninPage from './pages/SigninPage'
import SignUpPage from './pages/SignUpPage'
function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Transfer />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
