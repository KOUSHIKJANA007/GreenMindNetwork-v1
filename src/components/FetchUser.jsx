import React, { useEffect } from 'react'
import { fetchUserById, loginAction } from '../store/userDetails';
import { useDispatch, useSelector } from 'react-redux';

const FetchUser = () => {
    const dispatch = useDispatch();
    const { users, isEdit } = useSelector((store) => store.user);
    console.log("edit", isEdit);
    useEffect(() => {
        dispatch(fetchUserById(users.id))
            .then((data) => {
                console.log("ss", data.payload);
                dispatch(loginAction.setUser(data.payload));
                localStorage.setItem("data", JSON.stringify(data.payload));
                dispatch(loginAction.setEditEnd());
            }).catch((err) => {
                console.log(err);
            })
    }, [isEdit])
    return (
        <></>
    )
}

export default FetchUser