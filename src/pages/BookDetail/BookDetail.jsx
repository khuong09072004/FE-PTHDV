import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './BookDetail.scss'
import { IoIosArrowBack } from 'react-icons/io'

const BookDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();



    useEffect(() => {
        // Gọi API để lấy thông tin sách theo id
        fetch(`https://localhost:7262/api/Book/GetBookById?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
                setLoading(false);
            })
            .catch(() => setLoading(false)); // Xử lý lỗi
    }, [id]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="error-container">
                <p>Không tìm thấy thông tin sách.</p>
            </div>
        );
    }

    return (
        <div className="book-detail-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
            <IoIosArrowBack className="back-icon"/> 
            Quay lại
            </button>
            <div className="book-detail">
                <div className="book-image">
                    <img src={book.imgSrc} alt={book.title} />
                </div>
                <div className="book-info">
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-author">Tác giả: {book.author}</p>
                    <p className="book-description">{book.description}</p>
                    <p className="book-price">Giá: ${book.price}</p>
                    <div className="book-actions">
                        <button className="btn add-to-cart">Thêm sách vào yêu thích</button>
                        <button className="btn view-more" onClick={()=>navigate(-1)} >Xem thêm sách</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
