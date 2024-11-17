import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import './AddAccountForm.scss';

const AddAccountForm = ({ addAccount }) => {
    const [open, setOpen] = useState(false);
    const [newAccount, setNewAccount] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAccount({ ...newAccount, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addAccount(newAccount); // Thêm tài khoản mới
        handleClose(); // Đóng dialog sau khi thêm tài khoản
    };

    const handleClose = () => {
        setOpen(false);
        setNewAccount({
            username: '',
            email: '',
            password: '',

        });
    };

    return (
        <div>
            <div className="button_addaccount">
                <Button variant="outlined" onClick={() => setOpen(true)} className='them_taikhoan'>
                    Thêm tài khoản
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Thêm tài khoản mới</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="Tên Tài Khoản"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        value={newAccount.username}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        value={newAccount.email}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        variant="outlined"
                        onChange={handleChange}
                        value={newAccount.password}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

AddAccountForm.propTypes = {
    addAccount: PropTypes.func.isRequired,
};

export default AddAccountForm;
