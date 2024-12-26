import { useEffect, useState } from "react";
import './FavoriteBooks.scss';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from "react-router-dom";

const FavoriteBooks = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const booksPerPage = 8; // Số lượng sách trên mỗi trang
    const navigate= useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('HIT-auth')); // Lấy thông tin người dùng từ localStorage

        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để xem danh sách yêu thích!");
            return;
        }

        // Gọi API lấy danh sách sách yêu thích
        fetch('https://localhost:7262/api/Book/GetFavoriteBooks', {
            headers: {
                'Content-Type': 'application/json',
                'UserId': user.id.toString(), // Gửi UserId qua header
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Không thể tải danh sách yêu thích!");
            })
            .then((data) => {
                setFavorites(data);
                setLoading(false);
            })
            .catch((error) => {
                toast.error(error.message || "Có lỗi xảy ra khi tải danh sách yêu thích!");
                setLoading(false);
            });
    }, []);

    const handleRemoveFromFavorites = async (bookId) => {
        const user = JSON.parse(localStorage.getItem('HIT-auth'));

        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để thực hiện thao tác này!");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7262/api/Book/RemoveFromFavorites/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'UserId': user.id.toString(), // Gửi UserId qua header
                },
            });

            if (response.ok) {
                setFavorites((prev) => prev.filter((book) => book.id !== bookId));
                toast.success("Đã xóa sách khỏi mục yêu thích!");
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Không thể xóa sách khỏi mục yêu thích!");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa sách khỏi mục yêu thích!");
        }
    };

    // Tính toán danh sách sách hiển thị trên trang hiện tại
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = favorites.slice(indexOfFirstBook, indexOfLastBook);

    // Tổng số trang
    const totalPages = Math.ceil(favorites.length / booksPerPage);

    // Chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const truncateTitle = (title, maxWords = 5) => {
        const words = title.split(' ');
        return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '...' : title;
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="empty-container">
                <p>Danh sách yêu thích của bạn trống.</p>
            </div>
        );
    }
    const goBack = () => {
        navigate('/')
      }

    return (
        <div className="favorite-books-container">
            <div className='back'>
                <span onClick={goBack}>
                    <IoIosArrowBack /> QUAY LẠI
                </span>
            </div>
            <h1>Sách Yêu Thích</h1>
            <div className="favorite-books-list">
                {currentBooks.map((book) => (
                    <div className="favorite-book-item" key={book.id}>
                        <img src={book.imgSrc} alt={book.title} className="book-image" />
                        <div className="book-details">
                            <h2 className="book-title">{truncateTitle(book.title)}</h2>
                            <button
                                className="btn remove-btn"
                                onClick={() => handleRemoveFromFavorites(book.id)}
                            >
                                Xóa khỏi yêu thích
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Phân trang */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FavoriteBooks;
