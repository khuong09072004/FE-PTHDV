import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import './CommentSection.scss';

const CommentSection = ({ bookId }) => {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState(null); // Trạng thái để lưu id bình luận đang sửa
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
            .catch(() => toast.error("Không thể tải bình luận."));
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
                // Cập nhật lại danh sách bình luận sau khi thêm
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

        if (!comment.trim()) {
            toast.error("Bình luận không thể trống.");
            return;
        }

        const updatedComment = {
            comment: comment, // Nội dung bình luận mới
        };

        fetch(`https://localhost:7262/api/Book/UpdateFeedBack/${bookId}/Comment/${feedbackId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'UserId': user.id.toString(),
            },
            body: JSON.stringify(updatedComment),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success("Bình luận đã được cập nhật!");
                setEditingCommentId(null); // Dừng chế độ chỉnh sửa
                setComment(""); // Xóa nội dung đã nhập
                // Cập nhật lại danh sách bình luận sau khi cập nhật
                fetch(`https://localhost:7262/api/Book/GetFeedBack/${bookId}`)
                    .then((response) => response.json())
                    .then((data) => setComments(data));
            })
            .catch(() => toast.error("Có lỗi khi cập nhật bình luận."));
    };

    // Xử lý xóa bình luận
    const handleDeleteComment = (feedbackId) => {
        console.log('comments before deletion:', comments); // Kiểm tra giá trị của comments trước khi xóa
        if (!user || !user.id) {
            toast.error("Bạn cần đăng nhập để xóa bình luận.");
            return;
        }

        if (!feedbackId) {
            toast.error("Không tìm thấy bình luận để xóa.");
            console.log(feedbackId)
            return;
        }

        // Kiểm tra xem feedbackId có tồn tại trong comments hay không
        const commentToDelete = comments.find((comment) => comment.id === feedbackId);
        if (!commentToDelete) {
            toast.error("Bình luận không tồn tại hoặc đã bị xóa.");
            return;
        }

        fetch(`https://localhost:7262/api/Book/DeleteFeedBack/${bookId}/Comment/${feedbackId}`, {
            method: 'DELETE',
            headers: {
                'UserId': user.id.toString(),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Có lỗi khi xóa bình luận.");
                }
                return response.json();
            })
            .then(() => {
                toast.success("Bình luận đã được xóa!");
                // Cập nhật lại danh sách bình luận sau khi xóa
                setComments((prevComments) => prevComments.filter((feedback) => feedback.id !== feedbackId));
            })
            .catch((error) => {
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
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Cập nhật bình luận..."
                                    />
                                    <button onClick={() => handleUpdateComment(feedback.id)}>Cập nhật</button>
                                </div>
                            ) : (
                                <p>{feedback.comment}</p>
                            )}

                            <div className="comment-actions">
                                <button onClick={() => setEditingCommentId(feedback.id)}>Chỉnh sửa</button>
                                <button onClick={() => handleDeleteComment(feedback.id)}>Xóa</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;
