import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import {  useState } from "react";
import FetchUser from "../components/FetchUser";
function App() {
  const { loading } = useSelector((store) => store.user);
  const [progress, setProgress] = useState(100)
  return (
    <>
      <Header />
      <FetchUser/>
      <ToastContainer autoClose={3000} position="bottom-right" />
      {loading ? <LoadingBar color="#78be20" progress={progress} /> : <Outlet />}
      <Footer />
    </>
  )
}

export default App
