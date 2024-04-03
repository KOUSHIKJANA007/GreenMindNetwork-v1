import React, { useEffect } from 'react'
import AdminNgoItem from './AdminNgoItem'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNgos, ngoAction } from '../store/ngoDetails';
import { unwrapResult } from '@reduxjs/toolkit';
import LoadingBar from 'react-top-loading-bar';
import { validationAction } from '../store/OtpValidation';

const AdminNgoDetails = () => {
  const { ngoData, loading } = useSelector((store) => store.ngo);
  const { progress } = useSelector((store) => store.validation);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validationAction.setProgress(50));
    dispatch(getAllNgos())
      .then(unwrapResult)
      .then((data) => {
        if (data?.length != '0') {
          dispatch(ngoAction.setNgoData(data));
          dispatch(validationAction.setProgress(100));
        }
      })
  }, [])
  console.log(ngoData);
  return (
    <>
      {loading && <LoadingBar progress={progress} color="#78be20" />}
      <div className='admin_ngo_details_container'>
        {ngoData?.map((item)=>
          <AdminNgoItem key={item?.id} ngo={item} />
        )}
      </div>
    </>
  )
}

export default AdminNgoDetails