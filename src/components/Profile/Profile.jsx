import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../apis/user.api';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
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
        navigate('/signin'); // Nếu lỗi, quay lại trang đăng nhập
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, [user, navigate]);

  const handleLogout = () => {
    navigate('/signin');
    window.location.reload(); // Làm mới trạng thái sau khi đăng xuất
  };

  const handleEditProfile = () => {
    navigate('/edit-profile'); // Điều hướng đến trang chỉnh sửa thông tin
  };

  return (
    <div className="profile-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : userInfo ? (
        <div className="profile-box">
          <h1>Thông Tin Cá Nhân</h1>
          <div className="profile-info">
            <div className="info-row">
              <strong>ID:</strong>
              <span>{userInfo.id}</span>
            </div>
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
          <div className="profile-actions">
            <button onClick={handleEditProfile} className="button">Chỉnh Sửa</button>
            <button onClick={handleLogout} className="button logout">Đăng Xuất</button>
          </div>
        </div>
      ) : (
        <p>Không tìm thấy thông tin người dùng!</p>
      )}
    </div>
  );
};

export default Profile;
