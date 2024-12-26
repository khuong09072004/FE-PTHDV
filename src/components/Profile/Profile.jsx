import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../apis/user.api';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import toast from 'react-hot-toast';
import { IoIosArrowBack } from 'react-icons/io'
import './Profile.scss';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Lấy thông tin user từ trạng thái lưu trữ
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) {
        console.error('User not logged in. Redirecting to sign-in page.');
        return navigate('/signin');
      }

      setIsLoading(true);
      try {
        const response = await getUserById(user.id); // Gọi API với ID người dùng
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
        navigate('/signin'); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [user, navigate]);

  const goBack = () => {
    navigate('/')
  }

  return (
    <div className="profile-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : userInfo ? (
        <div className="profile-box">
          <div className='back'>
            <span onClick={goBack}>
              <IoIosArrowBack /> QUAY LẠI
            </span>
          </div>
          <h1>Thông Tin Cá Nhân</h1>
          <div className="profile-info">
            <div className="info-row">
              <strong>Tên đăng nhập:</strong>
              <span>{userInfo.username}</span>
            </div>
            <div className="info-row">
              <strong>Email:</strong>
              <span>{userInfo.email}</span>
            </div>
            <div className="info-row">
              <strong>Vai trò:</strong>
              <span>{userInfo.role}</span>
            </div>
          </div>
        </div>
      ) : (
        <p>Không tìm thấy thông tin người dùng!</p>
      )}
    </div>
  );
};

export default Profile;
