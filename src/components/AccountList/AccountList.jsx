import React, { useState } from 'react';
import './AccountList.scss';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const AccountList = ({ accounts, deleteAccount, startEditing }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(Math.ceil(accounts.length / itemsPerPage));
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(accounts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <div className="account-list">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên Tài Khoản</th>
            <th>Email</th>
            <th>Mật Khẩu</th>
            <th>Quyền Hạn</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentAccounts.map((account) => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>{account.password}</td>
              <td>{account.role}</td>
              <td>
                <div className="button-group">
                  <button onClick={() => startEditing(account)}>Chỉnh sửa</button>
                  <button onClick={() => deleteAccount(account.id)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <FaArrowLeft /> {/* Icon mũi tên trái */}
        </button>
        <span>Trang {currentPage} / {Math.ceil(accounts.length / itemsPerPage)}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(accounts.length / itemsPerPage)}
        >
          <FaArrowRight /> {/* Icon mũi tên phải */}
        </button>
      </div>
    </div>
  );
};

export default AccountList;
