import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import './EditBookForm.scss'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import { toast } from 'react-toastify';

const EditBookForm = ({ editingBook, editBook, closeEditForm }) => {
  const [book, setBook] = useState(editingBook);
  const [upload, setUpload] = useState(null); // Lưu ảnh tải lên
  const inputRef = useRef();

  useEffect(() => {
    setBook(editingBook);
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUpload(file); // Cập nhật file ảnh
    } else {
      toast.error('Vui lòng chọn một tệp hình ảnh hợp lệ.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường thông tin cơ bản trước khi gửi
    if (!book.title || !book.author || !book.price) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Tạo FormData để gửi yêu cầu multipart/form-data
    const formData = new FormData();
    formData.append('upc', book.upc);
    formData.append('title', book.title);
    formData.append('author', book.author);
    formData.append('genre', book.genre);
    formData.append('price', book.price);
    formData.append('starRating', book.starRating);
    formData.append('status', book.status);
    formData.append('description', book.description);

    // Nếu có file ảnh mới, thêm vào FormData
    if (upload) {
      formData.append('file', upload); // Đính kèm file ảnh vào FormData
    }

    try {
      const response = await fetch(`https://localhost:7262/api/Book/UpdateBook/${book.id}`, {
        method: 'PUT',
        body: formData,
      });

      const textResponse = await response.text(); // Lấy phản hồi dưới dạng văn bản

      // In ra phản hồi để kiểm tra dữ liệu trả về
      console.log('Server Response:', textResponse);

      if (!response.ok) {
        console.error('Error from server:', textResponse);
        toast.error(`Lỗi từ server: ${textResponse}`);
        return;
      }

      // Kiểm tra nếu phản hồi là JSON hợp lệ
      if (textResponse.startsWith("{")) { // Kiểm tra xem phản hồi có phải là JSON không
        try {
          const updatedBook = JSON.parse(textResponse); // Chuyển đổi thành JSON nếu là JSON hợp lệ
          editBook(updatedBook);
          closeEditForm();
          setUpload(null);
          toast.success('Cập nhật sách thành công!');
        } catch (jsonError) {
          console.error('Không thể phân tích dữ liệu JSON:', jsonError);
          toast.error('Dữ liệu trả về từ server không phải là JSON hợp lệ.');
        }
      } else {
        // Nếu phản hồi chỉ là thông báo đơn giản (không phải JSON)
        toast.success(textResponse || 'Cập nhật sách thành công!');
        closeEditForm();
        setUpload(null);
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Không thể kết nối với server.');
    }
  };


  const closeForm = () => {
    setUpload(null); // Clear file input state khi đóng form
    closeEditForm();
  };

  return (
    <Dialog open={!!editingBook} onClose={closeForm}>
      <DialogTitle>Chỉnh sửa sách</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="upc"
          label="UPC"
          type="text"
          fullWidth
          variant="outlined"
          value={book.upc}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="title"
          label="Tiêu đề"
          type="text"
          fullWidth
          variant="outlined"
          value={book.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="author"
          label="Tác Giả"
          type="text"
          fullWidth
          variant="outlined"
          value={book.author}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="genre"
          label="Thể loại"
          type="text"
          fullWidth
          variant="outlined"
          value={book.genre}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="Giá"
          type="text"
          fullWidth
          variant="outlined"
          value={book.price}
          onChange={handleChange}
        />
        <div className="new-input-upload">
          <label className="custom-file-upload">
            <span className="icon-upload">📤</span>
            Chọn hình ảnh
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange} // Cập nhật state khi chọn file
              ref={inputRef}
            />
          </label>
          {upload && <div className="file-name">Tệp đã chọn: {upload.name}</div>}
        </div>

        <TextField
          margin="dense"
          name="starRating"
          label="Đánh giá sao"
          type="text"
          fullWidth
          variant="outlined"
          value={book.starRating}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Tình Trạng"
          type="text"
          fullWidth
          variant="outlined"
          value={book.status}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="viewCount"
          label="Lượt xem"
          type="text"
          fullWidth
          variant="outlined"
          value={book.viewCount}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Mô tả"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={book.description}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeForm} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditBookForm.propTypes = {
  editingBook: PropTypes.object.isRequired,
  editBook: PropTypes.func.isRequired,
  closeEditForm: PropTypes.func.isRequired,
};

export default EditBookForm;
