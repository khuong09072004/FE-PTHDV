import './Header.scss';
import { IconSearch } from '@tabler/icons-react';
import Logo from '../../assets/images/logo.png';
import '../../i18n';
import { useTranslation } from 'react-i18next';
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
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';

const Header = () => {
    const { t } = useTranslation('header');
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
        navigate('/'); // Quay về trang chủ sau khi đăng xuất
        handleClose(); // Đóng menu sau khi đăng xuất
    };

    const handleClickSignIn = () => {
        navigate('/signIn');
    };
    const handleClickSignUp = () => {
        navigate('/signUp');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">
                    <img src={Logo} alt="Logo" className="logo" />
                </a>
            </div>
            <div className="navbar-search">
                <input type="text" placeholder={t('header1')} className="search-input" />
                <button className="search-button">
                    <IconSearch stroke={2} color="white" />
                </button>
            </div>
            <div className="navbar-buttons">
                {user ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar src="https://picsum.photos/200/300" sx={{ width: 32, height: 32 }} />
                            </IconButton>
                        </Tooltip>
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
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Đăng xuất
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <>
                        <button className="login-button" onClick={handleClickSignIn}>
                            {t('header2')}
                        </button>
                        <button className="signup-button" onClick={handleClickSignUp}>
                            {t('header3')}
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Header;
