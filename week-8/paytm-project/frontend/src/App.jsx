
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Transfer from './pages/Transfer'
import Dashboard from './pages/Dashboard'
import SignUpPage from './pages/SignUpPage'
import SignIn from './pages/SigninPage'
import { UserProvider } from './UserContext'
function App() {
  return (
    <>
       <BrowserRouter>
          <UserProvider>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
        </Routes>
          </UserProvider>
      </BrowserRouter>
    </>
  )
}

export default App
