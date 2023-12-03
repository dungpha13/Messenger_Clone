import HomePage from "../pages/HomePage";
import Chat from "../pages/Chat";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


const publicRoutes = [
    {
        path: '/', component: HomePage
    },
    {
        path: '/login', component: Login
    },
    {
        path: '/signup', component: Signup
    },
]

const privateRoutes = [
    {
        path: '/chats', component: Chat
    }
]

export { privateRoutes, publicRoutes }