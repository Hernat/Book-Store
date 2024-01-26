import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate, useLocation } from 'react-router-dom'

const Logout = () => {
    const { logout } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'

    const handleLogout = () => {
        logout()
            .then(() => {
                // Sign-out successful.
                navigate(from, { replace: true })
            })
            .catch((error) => {
                // An error happened.
            })
    }

    return (
        <div className="h-screen bg-teal-100 flex items-center justify-center  ">
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    )
}

export default Logout
