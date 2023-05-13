import { Navbar } from "./components/navbar/Navbar"
import { Footer } from "./components/footer/Footer";
import './app.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Home } from "./pages/home/Home";
import { Gigs } from "./pages/gigs/Gigs";
import { Gig } from "./pages/gig/Gig";
import { Orders } from "./pages/orders/Orders";
import { MyGigs } from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import { Messages } from "./pages/messages/Messages";
import { Message } from "./pages/message/Message";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Business from "./pages/business/Business";
import League from "./pages/CreatorLeague/League";
import Raise from "./pages/add/Raise";
import Create from "./components/League/Create";
import Signup from "./pages/signup/Signup";
import Meet from "./pages/meet/Meet";
function App() {
  const queryClient = new QueryClient();
  const Layout=()=>{
    return(
      <>
       <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
        path:'/',
        element:<Home/>
        },
        {
        path:'/gigs',
        element:<Gigs/>
        },
        {
        path:'/gig',
        element:<Gig/>
        },
        {
          path:'/create',
          element:<Create/>
        },
        {
        path:'/orders',
        element:<Orders/>
        },
        {
        path:'/mygigs',
        element:<MyGigs/>
        },
        {
        path:'/add',
        element:<Add/>
        },
        {
        path:'/messages',
        element:<Messages/>
        },
        {
        path:'/message/:id',
        element:<Message/>
        },
        {
          path:'/login',
          element:
          <GoogleOAuthProvider clientId='830258454445-nouoa39un4ikve00p1b0p0odbo0hgmd1.apps.googleusercontent.com'><Login/></GoogleOAuthProvider>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        
        {
          path:'/business',
          element:<Business/>
        }
      ]
    },
    {
      path:"/dashboard",
      element:<Dashboard/>
    },{
      path:"/league",
      element:<League/>
    },
    {
      path:'/meet',
      element:<Meet/>
    }
  ]);

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
