'use client';
import React,{useEffect} from 'react';
import UserDashboard from '../Components/UserDashboard';
import { useRouter } from 'next/navigation';

const DashboardPage = () => {
  const router = useRouter();
      useEffect(() => {
          const user = JSON.parse(localStorage.getItem('user'));
          if (!user || user.role !== 'user') {
              router.push('/');
          }
      }, []);
  return (
    <div>
      <UserDashboard />
    </div>
  );
};

export default DashboardPage;
