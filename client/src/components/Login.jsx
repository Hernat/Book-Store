import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

import GoogleLogo from '../assets/google-logo.svg'

const Login = () => {
    const { loginWithPassword, loginWithGoogle } = useContext(AuthContext)
    const [error, setError] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || '/'

    const handleSignUp = (e) => {
        e.preventDefault()
        const form = e.target

        const email = form.email.value
        const password = form.password.value

        loginWithPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                // ...
                alert('Login successfully')
                navigate(from, { replace: true })
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                setError(errorMessage)
            })
    }

    // signup with google

    const handleRegister = () => {
        loginWithGoogle()
            .then((result) => {
                alert('Login successfully')
                navigate(from, { replace: true })
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // ..
                setError(errorMessage)
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Login </h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form
                                onSubmit={handleSignUp}
                                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                            >
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        autoComplete="off"
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                                        placeholder="Password"
                                    />
                                </div>

                                <p className="text-red-500 text-base">
                                    {error && 'Email or password not correct'}
                                </p>

                                <p className="text-base">
                                    <Link
                                        className="text-blue-700 underline"
                                        to="/signup"
                                    >
                                        Signup
                                    </Link>{' '}
                                    here !
                                </p>
                                <div className="relative ">
                                    <button
                                        type="submit"
                                        className="bg-blue-700 w-full text-white rounded-md px-2 py-1"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>

                            <hr />

                            <div className="flex flex-col w-full items-center mt-5 gap-3">
                                <button
                                    className="block"
                                    onClick={handleRegister}
                                >
                                    <img
                                        src={GoogleLogo}
                                        alt="google"
                                        className="w-12 h-12 inline-block"
                                    />{' '}
                                    Login with Google
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
