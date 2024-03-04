import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


const Public = ({ Component }) => {
    const { isLogin } = useSelector((store) => store.user);
    const navigate = useNavigate()
    useEffect(() => {
        if (isLogin) {
            navigate("/userhome")
        }
        else{
            navigate("/")
        }
    }, []);
    return (
        <>
            {!isLogin && <Component />}

        </>
    )
}

export default Public