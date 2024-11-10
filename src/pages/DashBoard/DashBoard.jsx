// src/components/Dashboard.jsx

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import BookIcon from '@mui/icons-material/Book';
import AccountIcon from '@mui/icons-material/AccountCircle';
import DashboardBook from '../DashboardBooks/DashboardBooks'; 
import DashboardAccount from '../DashBoardAccount/DashboardAccount';  
import './Dashboard.scss'

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState('books');

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOpen(false);
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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handlePageChange('books')}>
            <BookIcon />
            <ListItemText primary="Quản lý sách" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handlePageChange('accounts')}>
            <AccountIcon />
            <ListItemText primary="Quản lý tài khoản" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Mở Menu</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box sx={{ padding: 2 }}>
        {renderContent()}
      </Box>
    </div>
  );
}
