import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import FetchArticles from "../components/FetchArticles"
import LoadingBar from "react-top-loading-bar"
import { useSelector } from "react-redux"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const fetchStatus=useSelector((store)=>store.fetchStatus)
  const [progress, setProgress] = useState(100)
  return (
    <>
      <Header />
      <FetchArticles/>
      <ToastContainer />
      {fetchStatus.fetching ? <LoadingBar color="#78be20" progress={progress}/>:<Outlet/>}
      <Footer/>
    </>
  )
}

export default App
