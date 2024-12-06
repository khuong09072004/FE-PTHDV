import React, { useState, useEffect } from 'react';
import AccountList from '../../components/AccountList/AccountList.jsx';
import AddAccountForm from '../../components/AddAccountForm/AddAccountForm.jsx';
import EditAccountForm from '../../components/EditAccountForm/EditAccountForm.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DashboardAccount.scss';

const DashboardAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [editingAccount, setEditingAccount] = useState(null);
  const [showAddAccountForm, setShowAddAccountForm] = useState(true); 

  useEffect(() => {
    fetch('https://localhost:7262/api/Auth/GetAllUser')
      .then((res) => res.json())
      .then((data) => setAccounts(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  const addAccount = (newAccount) => {
    fetch('https://localhost:7262/api/Auth/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAccount),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error adding account');
        return res.text();
      })
      .then((addedAccount) => {
        setAccounts( (prevAccounts) => [...prevAccounts, newAccount]);
        toast.success("Thêm tài khoản thành công!");
      })
      .catch((error) => {
        console.log("Error adding account:", error);
        toast.error("Đã xảy ra lỗi khi thêm tài khoản.");
      });
  };

  const deleteAccount = (id) => {
    fetch(`https://localhost:7262/api/Auth/DeleteAccount/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setAccounts(accounts.filter((account) => account.id !== id));
        toast.success("Xóa tài khoản thành công!"); 
      })
      .catch((error) => {
        console.log("Error deleting account:", error);
        toast.error("Đã xảy ra lỗi khi xóa tài khoản."); 
      });
  };

  const editAccount = (updatedAccount) => {
    fetch(`https://localhost:7262/api/Auth/UpdateAccount/${updatedAccount.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAccount),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((message) => {
            throw new Error(message || 'Error updating account');
          });
        }
        return res.json();
      })
      .then((editedAccount) => {
        setAccounts((prevAccounts) =>
          prevAccounts.map((account) => (account.id === editedAccount.id ? editedAccount : account))
        );
        toast.success("Cập nhật tài khoản thành công!");
        setEditingAccount(null);
      })
      .catch((error) => {
        console.error('Error editing account:', error);
        toast.error(error.message || 'Đã xảy ra lỗi khi cập nhật tài khoản.');
      });
  };

  const startEditing = (account) => {
    setEditingAccount(account);
  };

  const closeEditForm = () => {
    setEditingAccount(null);
  };

  return (
    <div className="dashboard">
      <h1>Quản lý tài khoản</h1>
      <AddAccountForm addAccount={addAccount} />
      {editingAccount && (
        <EditAccountForm 
          editingAccount={editingAccount} 
          editAccount={editAccount} 
          closeEditForm={closeEditForm} 
        />
      )}
      <AccountList 
        accounts={accounts} 
        deleteAccount={deleteAccount} 
        startEditing={startEditing} 
      />
      <ToastContainer />
    </div>
  );
};

export default DashboardAccount;
