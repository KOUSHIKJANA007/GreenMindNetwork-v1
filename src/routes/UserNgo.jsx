import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllNgos, getNgoByUser, ngoAction } from '../store/ngoDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import UserNgoItem from '../components/UserNgoItem';
import { FaCashRegister } from "react-icons/fa";

const UserNgo = () => {
  document.title = "NGO Dashboard"
  const dispatch = useDispatch();
  const{users}=useSelector((store)=>store.user);
  const { ngoData, userNgo, isFetch, loading } = useSelector((store) => store.ngo);

  useEffect(() => {
    dispatch(getAllNgos())
      .then(unwrapResult)
      .then((data) => {
        dispatch(ngoAction.setNgoData(data))
        if(data?.length!='0'){
          dispatch(ngoAction.setTotalNgo(data?.length))
        }
        else{
          dispatch(ngoAction.setTotalNgo('0'))
        }
      })
    dispatch(ngoAction.setFetchEnd());
  }, [isFetch])

  useEffect(() => {
    dispatch(getNgoByUser(users.id))
      .then(unwrapResult)
      .then((obj) => {
        dispatch(ngoAction.setUserNgoData(obj))
      })
      .catch((err)=>{
        console.log({err});
      })
  }, [])
  console.log(userNgo);
  return (
    <>
      <div className="ngo_details_container">
        <div className="user_ngo_details_container">
          <div className="user_ngo_details_heading">
            <h1>your NGO is here</h1>
          </div>
          <div className="all_ngo_items_container">
            {userNgo?.id == "0"

              ?
              <div className='ngo_not_found'>
                <h2>You don't have NGO</h2>
                <button><Link to="/ngo-register">Join our ngo partner programme</Link></button>
              </div>
              :
              <UserNgoItem ngoDatas={userNgo} />}
          </div>
        </div>
        <div className="all_ngo_details_container">
          <div className="all_ngo_details_heading">
            <h1>All our partner NGOs</h1>
          </div>
          <div className="all_ngo_items_container">
            {ngoData?.map((item) =>
              <UserNgoItem key={item.id} ngoDatas={item} />
            )}
          </div>
        </div>
       <div className="ngo_create_button">
          <button><Link to="/ngo-register"><FaCashRegister className='ngo_create_icon'/>create ngo</Link></button>
       </div>
      </div>
    </>
  )
}

export default UserNgo