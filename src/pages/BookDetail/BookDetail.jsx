import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './BookDetail.scss'
import { IoIosArrowBack } from 'react-icons/io'
import axios from 'axios';
import toast from 'react-hot-toast';
import CommentSection from "../../components/CommentSection/CommentSection";

const BookDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage


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

    const handleAddToFavorites  = async () => {
        const user = JSON.parse(localStorage.getItem('HIT-auth')); // Kiểm tra nếu có thông tin người dùng
        console.log(user);
    
        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để thêm sách vào yêu thích.");
            return;
        }
    
        const bookData = {
            bookId: book.id, // Gửi chỉ ID của sách
        };
    
        // Gửi yêu cầu tới API để thêm sách vào danh sách yêu thích
        try {
            console.log('Gửi request với UserId:', user.id);
            const response = await fetch('https://localhost:7262/api/Book/AddToFavorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'UserId': user.id.toString(),
                },
                body: JSON.stringify(bookData), // Gửi body là thông tin người dùng và ID của sách
            });
            console.log('Response từ API:', response);
    
            const data = await response.json();
            console.log('Response body:', data);
    
            if (response.ok) {
                toast.success("Sách đã được thêm vào danh sách yêu thích.");
            } else {
                toast.error(data.message || "Lỗi khi thêm sách vào danh sách yêu thích.");
            }
        } catch (error) {
            console.error('API error:', error);
            toast.error("Không thể kết nối đến API.");
        }
    };
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
    const getImageUrl = (imgSrc) => {
        if (!imgSrc) return ''; // Nếu imgSrc là null hoặc undefined, trả về chuỗi rỗng
        // Kiểm tra nếu đường dẫn ảnh là URL đầy đủ
        if (imgSrc.startsWith('http') || imgSrc.startsWith('https')) {
            return imgSrc; // Đã có URL đầy đủ
        }
        // Nếu không, thêm URL cơ sở vào
        return `https://localhost:7262${imgSrc}`;
    };

    return (
        <div className="book-detail-container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <IoIosArrowBack className="back-icon" />
                Quay lại
            </button>
            <div className="book-detail">
                <div className="book-image">
                    <img src={getImageUrl(book.imgSrc)} alt={book.title} />
                </div>
                <div className="book-info">
                    <h1 className="book-title">{book.title}</h1>
                    <p className="book-author">Tác giả: {book.author}</p>
                    <p className="book-description">{book.description}</p>
                    <p className="book-price">Giá: ${book.price}</p>
                    <div className="book-actions">
                        <button className="btn add-to-cart" onClick={handleAddToFavorites}>
                            Thêm sách vào yêu thích
                        </button>
                        <button className="btn view-more" onClick={() => navigate(-1)}>
                            Xem thêm sách
                        </button>
                    </div>
                </div>
            </div>
            {/* Phần Bình luận */}
            <CommentSection bookId={id} />
        </div>
    );
};

export default BookDetail;
