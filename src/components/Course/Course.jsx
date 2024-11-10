import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Grid, Tooltip, Box, Button, styled } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { formatCurrency } from '../../utils';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';

const styles = {
    cardMedia: {
        height: 'auto',
        width: '100%',
        maxHeight: '300',
        objectFit: 'cover',
        transition: 'filter 0.3s ease',
        '&:hover': {
            filter: 'brightness(0.7)',
        },
    },
    starContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold', color: 'text.primary'
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginTop: 3,
        marginBottom: 2,
    },
    courseName: {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    courseAuthor: {
        color: '#757575',
        fontSize: '0.875rem',
    },
    tooltip: {
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '0.875rem',
        border: '2px solid #ccc',
        ul: {
            listStyleType: 'none',
            padding: 0,
            margin: 0,
        },
        li: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            paddingLeft: '16px',
        },
    },
    star: {
        color: '#FFD700',
        marginRight: 4
    },
    checkIcon: {
        marginRight: '8px',
    },
    cart: {
        backgroundColor: 'rgb(166, 52, 136)',
        padding: '16px',
        borderRadius: '8px',
        color: '#fff',
        width: '75%',
        fontWeight: 'bold'
    },
    heart: {
        fontSize: '1.8rem',
        margin: 'auto',
        transition: 'transform 0.3s ease-in-out',
    },
    date: {
        color: 'green'
    },
    hour: {
        color: '#757575',
        fontSize: '0.875rem',
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
        marginLeft: '1.5rem'
    }
};
const DotIcon = styled(FiberManualRecordSharpIcon)(({ theme }) => ({
    fontSize: 'small',
    marginLeft: theme.spacing(1),
}));


const Course = ({ courses = [] }) => {
    const feCourses = courses.filter(course => course.genre === 'fe');
    const beCourses = courses.filter(course => course.genre === 'be');

    const renderStars = (numStars) => {
        const fullStars = Math.floor(numStars);
        const hasHalfStar = numStars % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <StarIcon
                        key={`full-${index}`}
                        style={styles.star}
                    />
                ))}
                {hasHalfStar && (
                    <StarHalfIcon
                        key="half"
                        style={styles.star}
                    />
                )}
                {[...Array(emptyStars)].map((_, index) => (
                    <StarBorderIcon
                        key={`empty-${index}`}
                        style={{ color: '#e0e0e0', marginRight: 4 }}
                    />
                ))}
            </>
        );
    };

    const [isFavorite, setIsFavorite] = useState(false);
    const toggleFavorite = (courseId) => {
        setIsFavorite((prevFavoriteas)=>({
            ...prevFavoriteas,
            [courseId]: !prevFavoriteas[courseId]

        }));
    };
    const renderTooltipContent = (course) => (
        <Box >
            <Typography variant="subtitle1" sx={styles.courseName}>{course.name}</Typography>
            <span style={{ color: '#19C72B' }}>Updated:</span>
            <span style={{ color: 'darkgreen' }}>{course.date}</span>
            <Typography variant="body2" sx={styles.hour}>
                {course.hour} total hours
                <DotIcon /><span>All level</span>
                <DotIcon /><span>Subtiles</span>
            </Typography>
            <Typography variant='body2'>{course.description}</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
                <ul>
                    {course.contents.slice(0, 3).map((item, index) => (
                        <li key={index}>
                            <CheckSharpIcon sx={styles.checkIcon}></CheckSharpIcon>
                            <Typography variant="body2">{item}</Typography></li>
                    ))}
                </ul>
            </Typography>
            <Box sx={{ display: 'flex', marginBottom: '6px' }}>
                <Button sx={styles.cart}>Add to cart</Button>
                <Box onClick={() => toggleFavorite(course.id)} sx={styles.circle}>
                    {isFavorite[course.id] ? (
                        <FavoriteIcon sx={{ ...styles.heart, transform: 'scale(1.1)' }} />
                    ) : (
                        <FavoriteBorderIcon sx={styles.heart} />
                    )}
                </Box>
            </Box>

        </Box>
    );

    return (
        <div>
            <Typography variant="h5" sx={styles.sectionTitle}>Top courses in Front-end</Typography>
            <Grid container spacing={1}>
                {feCourses.map(course => (
                    <Grid item xs={12} sm={6} md={3} key={course.id} sx={{ height: 350 }}>
                        <Tooltip
                            title={renderTooltipContent(course)}
                            placement="right"
                            arrow
                            componentsProps={{
                                tooltip: {
                                    sx: styles.tooltip,
                                },
                                arrow: { sx: { color: '#grey' } }
                            }}
                        >
                            <Card sx={{ maxWidth: 250, height: 300 }}>
                                <CardMedia
                                    component="img"
                                    sx={styles.cardMedia}
                                    image={course.thumbnail}
                                    alt={course.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={styles.courseName}>{course.name}</Typography>
                                    <Typography variant='body2' sx={styles.courseAuthor}>{course.author}</Typography>
                                    <Typography sx={styles.starContainer}>
                                        {course.star} {renderStars(course.star)}
                                    </Typography>
                                    <Typography sx={styles.price}>
                                        {formatCurrency(course.price)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" sx={styles.sectionTitle}>Top courses in Back-end</Typography>
            <Grid container spacing={1}>
                {beCourses.map(course => (
                    <Grid item xs={12} sm={6} md={3} key={course.id} sx={{ height: 350 }}>
                        <Tooltip
                            title={renderTooltipContent(course)}
                            placement="right"
                            arrow
                            componentsProps={{
                                tooltip: {
                                    sx: styles.tooltip,
                                },
                                arrow: { sx: { color: '#grey' } }
                            }}
                        >
                            <Card sx={{ maxWidth: 250, height: 300 }}>
                                <CardMedia
                                    component="img"
                                    sx={styles.cardMedia}
                                    image={course.thumbnail}
                                    alt={course.name}
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={styles.courseName}>{course.name}</Typography>
                                    <Typography variant='body2' sx={styles.courseAuthor}>{course.author}</Typography>
                                    <Typography sx={styles.starContainer}>
                                        {course.star} {renderStars(course.star)}
                                    </Typography>
                                    <Typography sx={styles.price}>
                                        {formatCurrency(course.price)}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Tooltip>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

Course.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            star: PropTypes.number.isRequired,
            price: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]).isRequired,
            genre: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            hour: PropTypes.number.isRequired,
            content: PropTypes.arrayOf(PropTypes.string).isRequired,
            date: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ),
};

export default Course;

