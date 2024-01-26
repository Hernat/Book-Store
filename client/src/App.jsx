import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import FooterBook from './components/FooterBook'

function App() {
    return (
        <>
            <Navbar />
            <Outlet />
            <FooterBook />
        </>
    )
}

export default App
