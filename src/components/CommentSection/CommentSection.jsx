import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import './CommentSection.scss';

const CommentSection = ({ bookId }) => {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(""); // Nội dung bình luận mới
    const [editingCommentId, setEditingCommentId] = useState(null); // ID của bình luận đang chỉnh sửa
    const [editingCommentContent, setEditingCommentContent] = useState(""); // Nội dung bình luận đang chỉnh sửa

    const user = JSON.parse(localStorage.getItem('HIT-auth')); // Kiểm tra người dùng đăng nhập

    // Lấy bình luận từ API
    useEffect(() => {
        if (!bookId) return; // Nếu không có bookId thì không gọi API

        fetch(`https://localhost:7262/api/Book/GetFeedBack/${bookId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Không thể tải bình luận.");
                }
                return response.json();
            })
            .then((data) => setComments(data))
            
    }, [bookId]);

    // Xử lý thêm bình luận
    const handleAddComment = () => {
        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để thêm bình luận.");
            return;
        }

        if (!comment.trim()) {
            toast.error("Bình luận không thể trống.");
            return;
        }

        const newComment = {
            bookId: bookId,
            comment: comment,
        };

        fetch('https://localhost:7262/api/Book/AddFeedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'UserId': user.id.toString(),
            },
            body: JSON.stringify(newComment),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success("Bình luận đã được thêm!");
                setComment(""); // Xóa nội dung đã nhập
                fetch(`https://localhost:7262/api/Book/GetFeedBack/${bookId}`)
                    .then((response) => response.json())
                    .then((data) => setComments(data));
            })
            .catch(() => toast.error("Có lỗi khi thêm bình luận."));
    };

    // Xử lý chỉnh sửa bình luận
    const handleUpdateComment = (feedbackId) => {
        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để chỉnh sửa bình luận.");
            return;
        }

        if (!editingCommentContent.trim()) {
            toast.error("Bình luận không thể trống.");
            return;
        }

        const updatedComment = {
            Comment: editingCommentContent, // Nội dung bình luận mới
        };

        fetch(`https://localhost:7262/api/Book/UpdateFeedback/${feedbackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'UserId': user.id.toString(),
            },
            body: JSON.stringify(updatedComment),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || "Có lỗi khi cập nhật bình luận.");
                    });
                }
                return response.json();
            })
            .then(() => {
                toast.success("Bình luận đã được cập nhật!");
                setEditingCommentId(null);
                setEditingCommentContent("");
                fetch(`https://localhost:7262/api/Book/GetFeedBack/${bookId}`)
                    .then((response) => response.json())
                    .then((data) => setComments(data));
            })
            .catch((error) => {
                console.error('Error updating comment:', error);
                toast.error(error.message || "Có lỗi khi cập nhật bình luận.");
            });
    };

    // Xử lý xóa bình luận
    const handleDeleteComment = (feedbackId) => {
        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để xóa bình luận.");
            return;
        }

        if (!feedbackId) {
            toast.error("Không tìm thấy bình luận để xóa.");
            return;
        }

        fetch(`https://localhost:7262/api/Book/DeleteFeedback/${feedbackId}`, {
            method: 'DELETE',
            headers: {
                'UserId': user.id.toString(),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(data => {
                        throw new Error(data.message || "Có lỗi khi xóa bình luận.");
                    });
                }
                return response.json();
            })
            .then(() => {
                toast.success("Bình luận đã được xóa!");
                setComments((prevComments) => prevComments.filter((feedback) => feedback.id !== feedbackId));
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
                toast.error(error.message || "Có lỗi khi xóa bình luận.");
            });
    };

    return (
        <div className="book-feedback">
            <h3>Bình luận</h3>
            {/* Form thêm bình luận */}
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                rows={4}
            />
            <button className="btn" onClick={handleAddComment} disabled={!comment.trim()}>
                Gửi bình luận
            </button>

            {/* Hiển thị bình luận */}
            <div className="comments-list">
                {comments.length === 0 ? (
                    <p>Chưa có bình luận nào cho sách này.</p>
                ) : (
                    comments.map((feedback) => (
                        <div key={feedback.id} className="comment-item">
                            <div className="user-info">
                                <span className="username">{feedback.username}</span>
                            </div>

                            {editingCommentId === feedback.id ? (
                                <div>
                                    <textarea
                                        value={editingCommentContent}
                                        onChange={(e) => setEditingCommentContent(e.target.value)}
                                        placeholder="Cập nhật bình luận..."
                                    />
                                    <button onClick={() => handleUpdateComment(feedback.id)} className="cap_nhap">Cập nhật</button>
                                </div>
                            ) : (
                                <p>{feedback.comment}</p>
                            )}

                            <div className="comment-actions">
                                <button onClick={() => {
                                    setEditingCommentId(feedback.id);
                                    setEditingCommentContent(feedback.comment);
                                }}><FaEdit /></button>
                                <button onClick={() => handleDeleteComment(feedback.id)}><MdDeleteForever /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;
