import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


const Protected = ({ Component }) => {
  const { isLogin } = useSelector((store) => store.user);
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLogin) {
      navigate("/signin")
    }
  }, []);
  return (
    <>
      {isLogin && <Component />}

    </>
  )
}

export default Protected