import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import './RecommendedBooks.scss';
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from 'react-icons/io'

const ITEMS_PER_PAGE = 12;

const RecommendedBooks = () => {
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
    const user = JSON.parse(localStorage.getItem('HIT-auth')); // Kiểm tra người dùng đăng nhập
    const navigate = useNavigate();

    // Lấy danh sách sách gợi ý từ API
    useEffect(() => {
        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để xem sách gợi ý.");
            return;
        }

        fetch(`https://localhost:7262/api/Book/GetRecommendedBooks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'UserId': user.id.toString(),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Không thể tải sách gợi ý.");
                }
                return response.json();
            })
            .then((data) => {
                setRecommendedBooks(data);
            })
            .catch(() => {
                toast.error("Có lỗi khi tải sách gợi ý.");
            });
    }, [user]);

    // Tính toán danh sách sách hiện tại theo trang
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentBooks = recommendedBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(recommendedBooks.length / ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const goBack = () => {
        navigate('/')
    }

    return (
        <div className="recommended-books-container">
            <div className='back'>
                    <span onClick={goBack}>
                        <IoIosArrowBack /> QUAY LẠI
                    </span>
                </div>

            <div className="recommended-books">
                
                <h2>Sách gợi ý</h2>
                <div className="book-list">
                    {currentBooks.length === 0 ? (
                        <p>Không có sách gợi ý nào.</p>
                    ) : (
                        currentBooks.map((book) => (
                            <div key={book.id} className="book-item">
                                <img src={book.imgSrc} alt={book.title} className="book-image" />
                                <h4>{book.title}</h4>
                                <p>Tác giả: {book.author}</p>
                            </div>
                        ))
                    )}
                </div>

                {/* Phân trang */}
                {totalPages > 1 && (
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={page === currentPage ? 'active' : ''}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendedBooks;
