import React, { useEffect } from 'react'
import { fetchUserById, loginAction } from '../store/userDetails';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const FetchUser = () => {
    const dispatch = useDispatch();
    const { users, isEdit } = useSelector((store) => store.user);
    useEffect(() => {
        dispatch(fetchUserById(users.id))
            .then((data) => {
                dispatch(loginAction.setUser(data.payload));
                localStorage.setItem("data", JSON.stringify(data.payload));
                dispatch(loginAction.setEditEnd());
            }).catch((err) => {
                toast.error(err)
            })
    }, [isEdit])
    return (
        <></>
    )
}

export default FetchUser