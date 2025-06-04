'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CandidateAside from './aside';
import DashboardArea from './dashboard-area';
import { useAppSelector, useAppDispatch  } from '@/redux/hook';
import { initialize_auth } from '@/redux/features/authSlice';

const CandidateDashboardMain = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState<boolean>(false);

  const { user, isAuthenticated, loading  } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize_auth());
  }, [dispatch]);

  useEffect(() => {
    if (loading) return; // 🔹 等待 Redux 初始化
    if (!isAuthenticated) {
      router.push('/');
    }
    console.log(user)
  }, [isAuthenticated, loading, router]);

  if (loading || !user) return <div className="loading-placeholder">Loading...</div>;

  return (
    <div className='main-page-wrapper'>
      {/* aside start */}
      <CandidateAside isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar} />
      {/* aside end  */}

      {/* dashboard area start */}
      <DashboardArea setIsOpenSidebar={setIsOpenSidebar} />
      {/* dashboard area end */}
    </div>
  );
};

export default CandidateDashboardMain;