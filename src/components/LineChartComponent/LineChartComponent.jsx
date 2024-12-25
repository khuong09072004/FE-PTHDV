import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const LineChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('https://localhost:7262/api/Book/LineChart_ViewCountperDay');
        const formattedData = response.data.map(item => ({
          date: new Date(item.date).toLocaleDateString('vi-VN'), 
          views: item.totalViewIncrement
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" name="Lượt truy cập" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
