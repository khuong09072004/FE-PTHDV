import './HeaderAdmin.scss';
import { IconSearch } from '@tabler/icons-react';
import Logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout'; 
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const HeaderAdmin = ({ onPageChange }) => {
    const navigate = useNavigate();
    const { user, clearUser } = useAuth();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        clearUser();
        navigate('/'); // Chuyển hướng sau khi đăng xuất
        handleClose(); // Đóng menu sau khi đăng xuất
    };

    const handlePageChange = (page) => {
        onPageChange(page);  
        handleClose();  
    };

    return (
        <nav className="navbar-admin">
            <div className="navbar-logo">
                <a href="">
                    <img src={Logo} alt="Admin Logo" className="logo" />
                </a>
            </div>
            <div className="navbar-search">
                <input type="text" placeholder="Tìm kiếm..." className="search-input" />
                <button className="search-button">
                    <IconSearch stroke={2} color="white" />
                </button>
            </div>
            <div className="navbar-admin-info">
                <span className="admin-name">Xin chào Admin</span>
                <div className="avatar-wrapper">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar src="https://picsum.photos/200/300" sx={{ width: 32, height: 32 }}></Avatar> 
                    </IconButton>
                </div>

                {/* Menu thay vì Drawer */}
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <Divider />
                    <MenuItem onClick={() => handlePageChange('books')}>
                        <ListItemIcon>
                            <ImportContactsIcon fontSize="small" />
                        </ListItemIcon>
                        Quản lý sách
                    </MenuItem>
                    <MenuItem onClick={() => handlePageChange('accounts')}>
                        <ListItemIcon>
                            <ManageAccountsIcon fontSize="small" />
                        </ListItemIcon>
                        Quản lý tài khoản
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Đăng xuất
                    </MenuItem>
                </Menu>
            </div>
        </nav>
    );
};

export default HeaderAdmin;
