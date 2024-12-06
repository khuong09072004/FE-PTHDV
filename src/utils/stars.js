import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

export const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const totalStars = 5;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {Array.from({ length: fullStars }).map((_, index) => (
                <StarIcon key={`full-${index}`} sx={{ color: '#ffb400' }} />
            ))}
            {hasHalfStar && <StarHalfIcon sx={{ color: '#ffb400' }} />}
            {Array.from({ length: totalStars - fullStars - (hasHalfStar ? 1 : 0) }).map((_, index) => (
                <StarBorderIcon key={`empty-${index}`} sx={{ color: '#ffb400' }} />
            ))}
        </div>
    );
};
