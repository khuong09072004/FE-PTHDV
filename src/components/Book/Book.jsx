import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Tooltip,
    Box,
    Button,
    styled,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';
import Pagination from '../PaginationBook/PaginationBook';
import { useNavigate } from 'react-router-dom';

const styles = {
    cardMedia: {
        height: '150px',
        width: '100%',
        maxHeight: '300',
        objectFit: 'cover',
        
        transition: 'filter 0.3s ease',
        '&:hover': {
            filter: 'brightness(0.7)',
        },
    },
    card: {
        maxWidth: '100%',
        height: 340,
        margin: 1
    },
    star: {
        color: '#FFD700',
        marginRight: 4,
    },
    price: {
        color: '#C92127',
        fontSize: '1.2rem',
        fontWeight: '600'
    },
    tooltip: {
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        border: '1px solid #ddd',
    },
    cart: {
        backgroundColor: '#0066AB',
        padding: '16px',
        borderRadius: '8px',
        color: '#fff',
        width: '70%',
        fontWeight: 'bold',
        marginTop: '28px',
        cursor:'pointer'
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        border: '2px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        marginLeft: '1.5rem',
        marginTop: '28px'
    },
    heart: {
        fontSize: '1.8rem',
        margin: 'auto',
        transition: 'transform 0.3s ease-in-out',
    },
    bookTitle: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    },
    bookAuthor: {
        color: '#757575',
        fontSize: '0.875rem',
    },
    viewCount: {
        color: '#757575',
        fontSize: '0.875rem',
        marginBottom: '8px',
    },
    filter: {
        width: '100%',
        maxWidth: 300,
        margin: '1rem auto',
        position: 'relative',
        '& .MuiInputBase-root': {
            borderRadius: '8px',
            backgroundColor: '#f7f9fc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                backgroundColor: '#eaf1f7',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            },
            '&.Mui-focused': {
                backgroundColor: '#e3f2fd',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#1976d2',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'color 0.3s ease',
            '&.Mui-focused': {
                color: '#0d47a1',
            },
        },
        '& .MuiSelect-icon': {
            color: '#1976d2',
            fontSize: '1.5rem',
        },
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '30px'
    },
};

const DotIcon = styled(FiberManualRecordSharpIcon)(({ theme }) => ({
    fontSize: 'small',
    marginLeft: theme.spacing(1),
}));

const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    if (words.length <= wordLimit) return description;
    return words.slice(0, wordLimit).join(' ') + '...';
};
const truncateTitle = (title, wordLimit) => {
    const words = title.split(' ');
    if (words.length <= wordLimit) return title;
    return words.slice(0, wordLimit).join(' ') + '...';
};

const Book = ({ books = [] }) => {
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [isFavorite, setIsFavorite] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 12;

    const navigate = useNavigate(); 

    const handleCardClick = (id) => {
        navigate(`/books/${id}`); 
    };

    const toggleFavorite = (bookId) => {
        setIsFavorite((prevFavorites) => ({
            ...prevFavorites,
            [bookId]: !prevFavorites[bookId],
        }));
    };

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };
    const getImageUrl = (imgSrc) => {
        if (!imgSrc) return ''; // Nếu imgSrc là null hoặc undefined, trả về chuỗi rỗng
        // Kiểm tra nếu đường dẫn ảnh là URL đầy đủ
        if (imgSrc.startsWith('http') || imgSrc.startsWith('https')) {
          return imgSrc; // Đã có URL đầy đủ
        }
        // Nếu không, thêm URL cơ sở vào
        return `https://localhost:7262${imgSrc}`;
      };

    const genres = ['All', ...new Set(books.map((book) => book.genre))];

    const filteredBooks =
        selectedGenre === 'All'
            ? books
            : books.filter((book) => book.genre === selectedGenre);

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderStars = (numStars) => {
        const fullStars = Math.floor(numStars);
        const hasHalfStar = numStars % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <StarIcon key={`full-${index}`} style={styles.star} />
                ))}
                {hasHalfStar && (
                    <StarHalfIcon key="half" style={styles.star} />
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <StarBorderIcon key={`empty-${index}`} style={{ color: '#e0e0e0', marginRight: 4 }} />
                ))}
            </>
        );
    };

    const renderTooltipContent = (book) => {
        const wordLimit = Math.floor(Math.random() * 11) + 15;
        return (
            <Box>
                <Typography variant="subtitle1" sx={styles.bookTitle}>
                    {book.title}
                </Typography>
                <Typography variant="body2" sx={styles.bookAuthor}>
                    By {book.author}
                </Typography>
                <Typography variant="body2" sx={styles.viewCount}>
                    {book.viewCount} views
                    <DotIcon />
                    <span>Status: {book.status}</span>
                </Typography>
                <Typography variant="body2">
                    {truncateDescription(book.description, wordLimit)}
                </Typography>
                <Box sx={{ display: 'flex', marginBottom: '6px' }}>
                    <Button sx={styles.cart} onClick={() => handleCardClick(book.id)}>Xem Sách</Button>
                    <Box onClick={() => toggleFavorite(book.id)} sx={styles.circle}>
                        {isFavorite[book.id] ? (
                            <FavoriteIcon sx={{ ...styles.heart, transform: 'scale(1.1)' }} />
                        ) : (
                            <FavoriteBorderIcon sx={styles.heart} />
                        )}
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <Box>

            <Grid container spacing={2}>
                {currentBooks.map((book) => (
                    <Grid item xs={12} sm={6} md={3} key={book.id}>
                        <Tooltip
                            title={renderTooltipContent(book)}
                            placement="right"
                            arrow
                            componentsProps={{
                                tooltip: {
                                    sx: styles.tooltip,
                                },
                            }}
                        >
                            <Card sx={{ maxWidth: 250, height: 350 }}  onClick={() => handleCardClick(book.id)}>
                                <CardMedia
                                    component="img"
                                    sx={styles.cardMedia}
                                    image={getImageUrl(book.imgSrc)}
                                    alt={book.title}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={styles.bookTitle}>
                                        {truncateTitle(book.title, 5)}
                                    </Typography>
                                    <Typography variant="body2" sx={styles.bookAuthor}>
                                        {book.author}
                                    </Typography>
                                    <Typography sx={styles.star}>
                                        {renderStars(book.starRating)}
                                    </Typography>
                                    <Typography sx={styles.price}>
                                        ${book.price.toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

Book.propTypes = {
    books: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            imgSrc: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            starRating: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            viewCount: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Book;
