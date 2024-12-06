import React from 'react';
import BarChartComponent from '../../components/BarChartComponent/BarChartComponent';
import LineChartComponent from '../../components/LineChartComponent/LineChartComponent';
import PieChartComponent from '../../components/PieChartComponent/PieChartComponent';
import './AdminDashboard.scss'
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Biểu Đồ Thống Kê Thông Tin</h2>
      <div className="charts-container">
        <div className="chart">
          <h3>Biểu Đồ Số Lượng Sách Theo Thể Loại</h3>
          <BarChartComponent />
        </div>
        <div className="chart">
          <h3>Biểu Đồ Số Lượng Sách Được Xem Trong Ngày</h3>
          <LineChartComponent/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
