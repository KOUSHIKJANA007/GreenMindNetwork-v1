import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
import FetchUser from "../components/FetchUser";
import { localStorageWithExpiry } from "../store/helper";
import {  loginAction } from "../store/userDetails";
function App() {
  const dispatch=useDispatch();
  const { loading } = useSelector((store) => store.user);
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if(localStorageWithExpiry.isExpire("token")){
      dispatch(loginAction.doLogout());
     toast.error("login expire")
    }
  }, [localStorageWithExpiry.isExpire("token")])
  return (
    <>
      <Header />
      <FetchUser />
      <ToastContainer autoClose={3000} position="bottom-right" />
      {loading ? <LoadingBar color="#78be20" progress={progress} /> : <Outlet />}
      <Footer />
    </>
  )
}

export default App
