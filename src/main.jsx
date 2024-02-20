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
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import greenMindsStore from './store'
import Home from './routes/Home'
import SignIn from './routes/SignIn'
import SignUp from './routes/SignUp'
import EditProfile from './routes/EditProfile'
import CreatePost from './routes/CreatePost'
import Article from './routes/Article'
import ArticleContent from './routes/ArticleContent'
import Protected from './user-routes/Protected'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp />},
      { path: "/editprofile", element: <Protected Component={EditProfile}/> },
      { path: "/articles", element: <Protected Component={Article} /> },
      { path: "/createpost", element: <Protected Component={CreatePost} /> },
      { path: "/articlecontent", element: <Protected Component={ArticleContent} /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={greenMindsStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
