import { Sidebar } from 'flowbite-react'
import { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import { HiChartPie, HiInbox, HiShoppingBag, HiTable } from 'react-icons/hi'
import { Button, Modal } from 'flowbite-react'

const SidebarBook = () => {
    const navigate = useNavigate()
    const { user, logout } = useContext(AuthContext)
    // console.log(user)
    const [openModal, setOpenModal] = useState(false)

    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const handleLogout = () => {
        logout()
            .then(() => {
                // Sign-out successful.
                navigate(from, { replace: true })
                setOpenModal(false)
            })
            .catch((error) => {
                // An error happened.
            })
    }

    return (
        <div>
            <Sidebar
                className="w-auto"
                aria-label="Sidebar with content separator example"
            >
                <Sidebar.Logo
                    img={user?.photoURL}
                    imgAlt="Flowbite logo"
                    className="rounded-full"
                >
                    {user?.displayName}
                </Sidebar.Logo>

                <Sidebar.Items>
                    <Sidebar.ItemGroup className="cursor-pointer">
                        <Sidebar.Item
                            icon={HiChartPie}
                            onClick={() => navigate('/admin/dashboard')}
                        >
                            Dashboard
                        </Sidebar.Item>

                        <Sidebar.Item
                            icon={HiInbox}
                            onClick={() => navigate('/admin/dashboard/upload')}
                        >
                            Upload Book
                        </Sidebar.Item>

                        <Sidebar.Item
                            icon={HiShoppingBag}
                            onClick={() => navigate('/admin/dashboard/manage')}
                        >
                            Manage Book
                        </Sidebar.Item>

                        <Sidebar.Item
                            onClick={() => navigate('/')}
                            icon={HiShoppingBag}
                        >
                            Book Store
                        </Sidebar.Item>

                        <Sidebar.Item
                            onClick={() => setOpenModal(true)}
                            icon={HiTable}
                        >
                            Logout
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <Modal
                size="sm"
                show={openModal}
                onClose={() => setOpenModal(false)}
            >
                <Modal.Header>Would you disconnect ? </Modal.Header>

                <Modal.Footer>
                    <Button onClick={() => handleLogout()}>Accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SidebarBook
