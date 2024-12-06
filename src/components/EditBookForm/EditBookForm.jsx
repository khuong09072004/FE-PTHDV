import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

const EditBookForm = ({ editingBook, editBook, closeEditForm }) => {
  const [book, setBook] = useState(editingBook);

  useEffect(() => {
    setBook(editingBook);
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBook(book); // Gọi hàm chỉnh sửa sách
    console.log("Form submitted:", book);
    closeEditForm(); // Đóng form sau khi chỉnh sửa
  };

  return (
    <Dialog open={!!editingBook} onClose={closeEditForm}>
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
        <TextField
          margin="dense"
          name="imgSrc"
          label="URL hình ảnh"
          type="text"
          fullWidth
          variant="outlined"
          value={book.imgSrc}
          onChange={handleChange}
        />
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
        <Button onClick={closeEditForm} color="primary">
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
