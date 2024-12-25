import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { getAllItemBooks } from "../../apis/books";
import Book from "../Book/Book";

const BookItem = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const LoadAllBooks = async () => {
        setLoading(true); 
        setError(null); 
        try {
            const res = await getAllItemBooks();
            console.log('Response', res);
            setBooks(res.data); 
        } catch (error) {
            console.error('Error fetching books:', error);
            setError("Failed to load books"); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        LoadAllBooks();
    }, []);

    if (loading) {
        return <Typography variant="h6">Đang tải sách...</Typography>; 
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Container sx={{
            marginTop:'30px'
        }}  >
            <Typography variant="h4" gutterBottom sx={{
            marginBottom:'30px'
        }}>
                Bạn Muốn Xem Sách Nào
            </Typography>
            <Book books={books}/>
        </Container>
    );
};

export default BookItem;
