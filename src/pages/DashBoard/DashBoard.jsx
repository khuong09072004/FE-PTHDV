import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import AccountIcon from '@mui/icons-material/AccountCircle';
import DashboardBook from '../DashboardBooks/DashboardBooks'; 
import DashboardAccount from '../DashBoardAccount/DashboardAccount';  
import HeaderAdmin from '../../common/HeaderAdmin/HeaderAdmin';
import AdminDashboard from '../DashboardChart/AdminDashboard';
import './Dashboard.scss';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = React.useState('books'); // Default page
  const [open, setOpen] = React.useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page); // Chuyển trang khi click vào mục menu
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'books':
        return <DashboardBook />;
      case 'accounts':
        return <DashboardAccount />;
      default:
        return <DashboardBook />;
    }
  };

  return (
    <div>
      {/* Header Admin */}
      

      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
  
        {/* Nội dung chính */}
        {renderContent()}
      </Box>
    </div>
  );
}
