import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SearchBarComponent.scss';

const SearchBarComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null); // Ref để theo dõi khu vực tìm kiếm

  // Hàm gọi API tìm kiếm
  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await axios.get(`https://localhost:7262/api/Book/QuickSearch?keyword=${keyword}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Hàm điều hướng đến chi tiết sách
  const handleNavigateToDetail = (id) => {
    navigate(`/books/${id}`);
  };

  // Xử lý sự kiện khi người dùng nhập chữ vào ô tìm kiếm
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value); // Gọi hàm tìm kiếm mỗi khi người dùng thay đổi giá trị
  };

  // Hàm để làm nổi bật từ khóa trong kết quả tìm kiếm
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  };

  // Đóng kết quả tìm kiếm khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchResults([]); // Đặt lại kết quả tìm kiếm khi nhấn ra ngoài
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar-container" ref={searchContainerRef}>
      <input
        type="text"
        placeholder="Tìm kiếm sách..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input"
      />

      {/* Hiển thị kết quả tìm kiếm */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <ul>
            {searchResults.map((item) => (
              <li
                key={item.id}
                onClick={() => handleNavigateToDetail(item.id)}
              >
                <h3>{highlightText(item.title, searchTerm)}</h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBarComponent;
