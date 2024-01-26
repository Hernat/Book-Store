import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../home/Home'
import Shop from '../shop/Shop'
import About from '../components/About'
import Blog from '../components/Blog'
import SignUp from '../components/SignUp'
import Login from '../components/Login'
import Logout from '../components/Logout'
import SingleBook from '../shop/SingleBook'

import DashboardLayout from '../dashboard/DashboardLayout'
import Dashboard from '../dashboard/Dashboard'
import UploadBook from '../dashboard/UploadBook'
import ManageBook from '../dashboard/ManageBook'
import EditBook from '../dashboard/EditBook'

import PrivateRoute from '../PrivateRoute/PrivateRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/shop',
                element: <Shop />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/blog',
                element: <Blog />,
            },
            {
                path: '/book/:id',
                element: <SingleBook />,
                loader: ({ params }) =>
                    fetch(`http://localhost:8080/get-book/${params.id}`),
            },
        ],
    },
    {
        path: '/admin/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: '/admin/dashboard',
                element: (
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                ),
            },
            {
                path: '/admin/dashboard/upload',
                element: <UploadBook />,
            },
            {
                path: '/admin/dashboard/manage',
                element: <ManageBook />,
            },
            {
                path: '/admin/dashboard/edit/:id',
                element: <EditBook />,
                loader: ({ params }) =>
                    fetch(`http://localhost:8080/get-book/${params.id}`),
            },
        ],
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/logout',
        element: <Logout />,
    },
])
