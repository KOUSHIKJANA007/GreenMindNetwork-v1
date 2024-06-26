import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import './index.css'
import '../src/style/ProfileCard.css'
import '../src/style/Navber.css'
import '../src/style/Footer.css'
import '../src/style/SignIn.css'
import '../src/style/SignUp.css'
import '../src/style/EditProfile.css'
import '../src/style/CreatePost.css'
import '../src/style/Article.css'
import '../src/style/Pagination.css'
import '../src/style/Home.css'
import '../src/style/Donation.css'
import '../src/style/ArticleContent.css'
import '../src/style/UserArticleItem.css'
import '../src/style/Comments.css'
import '../src/style/FetchComment.css'
import '../src/style/validation.css'
import '../src/style/RegisterNgo.css'
import '../src/style/Ngo.css'
import '../src/style/UserProfile.css'
import '../src/style/UserNgo.css'
import '../src/style/UserNgoDashboard.css'
import '../src/style/SocialPost.css'
import '../src/style/NgoDetails.css'
import '../src/style/CreateEvent.css'
import '../src/style/UserHome.css'
import '../src/style/AdminDashboard.css'
import '../src/style/AdminUser.css'
import '../src/style/AdminNgo.css'
import '../src/style/ContactUs.css'
import '../src/style/AdminChat.css'
import '../src/style/AddProgress.css'
import '../src/style/EventExplorer.css'
import '../src/style/ViewProgress.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './routes/Home'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import EditProfile from './routes/EditProfile'
import CreatePost from './routes/CreatePost'
import Article from './routes/Article'
import ArticleContent from './routes/ArticleContent'
import Protected from './user-routes/Protected'
import UserHome from './routes/UserHome'
import { Provider } from 'react-redux'
import greenMindStore, { persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import Public from './user-routes/public.jsx'
import UserPosts from './routes/UserPosts.jsx'
import EditPost from './routes/EditPost.jsx'
import Donation from './routes/Donation.jsx'
import EmailInput from './routes/EmailInput.jsx'
import OtpInput from './routes/OtpInput.jsx'
import ForgotEmail from './routes/ForgotEmail.jsx'
import ChangePassword from './routes/ChangePassword.jsx'
import ForgotOtpInput from './routes/ForgotOtpInput.jsx'
import Ngo from './routes/Ngo.jsx'
import RegisterNgo from './routes/RegisterNgo.jsx'
import UserProfile from './routes/UserProfile.jsx'
import UserNgo from './routes/UserNgo.jsx'
import ProtectNgo from './user-routes/ProtectNgo.jsx'
import UserNgoDashboard from './routes/UserNgoDashboard.jsx'
import OtherUserNgoView from './routes/OtherUserNgoView.jsx'
import EditNgo from './routes/EditNgo.jsx'
import DonationDashboard from './routes/DonationDashboard.jsx'
import CreateEvent from './routes/CreateEvent.jsx'
import EditEvent from './routes/EditEvent.jsx'
import AdminDashboard from './routes/AdminDashboard.jsx'
import AdminUserContent from './routes/AdminUserContent.jsx'
import ContactUs from './routes/ContactUs.jsx'
import AdminChat from './routes/AdminChat.jsx'
import EventExplorer from './routes/EventExplorer.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Public Component={Home} /> },
      { path: "/signin", element: <SignIn /> },
      {
        path: "/email-input", element: <EmailInput />, children: [
          { path: "otp-input", element: <OtpInput />,children:[
            { path: "signup", element: <SignUp /> },
          ] },
        ]
      },
      { path: "/forgot-email", element: <ForgotEmail />,children:[
        { path: "forgot-otp-input", element: <ForgotOtpInput />,children:[
          { path: "newpassword", element: <ChangePassword /> },
        ] },
      ] },
      { path: "/editprofile", element: <Protected Component={EditProfile} /> },
      { path: "/articles", element: <Article /> },
      { path: "/createpost", element: <Protected Component={CreatePost} /> },
      { path: "/articlecontent/:postId", element: <ArticleContent /> },
      { path: "/userhome", element: <Protected Component={UserHome} /> },
      { path: "/userposts", element: <Protected Component={UserPosts} /> },
      { path: "/editpost/:postId", element: <Protected Component={EditPost} /> },
      { path: "/donation/:ngoId/:eventId", element: <Protected Component={Donation} /> },
      { path: "/ngo", element: <ProtectNgo Component1={Ngo} Component2={UserNgo} />},
      { path:"/ngo-register",element:<Protected Component={RegisterNgo}/>},
      { path:"/user-profile",element:<Protected Component={UserProfile}/>},
      { path:"/ngo-content/:userId/:ngoId",element:<Protected Component={UserNgoDashboard}/>},
      { path: "/ngo-details/:ngoId", element: <Protected Component={OtherUserNgoView}/>},
      { path: "/ngo-edit/:ngoId", element: <Protected Component={EditNgo}/>},
      { path: "/donation-dashboard", element: <Protected Component={DonationDashboard}/>},
      { path: "/create-event/:ngoId", element: <Protected Component={CreateEvent}/>},
      { path: "/edit-event/:eventId/:ngoId", element: <Protected Component={EditEvent}/>},
      { path: "/admin-dashboard", element: <Protected Component={AdminDashboard}/>},
      { path: "/contact-us", element: <ContactUs/>},
      { path: "/user-content/:userId", element: <Protected Component={AdminUserContent}/>},
      { path: "/admin-chat", element: <Protected Component={AdminChat}/>},
      { path: "/event-explorer/:eventId", element: <Protected Component={EventExplorer}/>},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={greenMindStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  // {/* </React.StrictMode>, */}
)
