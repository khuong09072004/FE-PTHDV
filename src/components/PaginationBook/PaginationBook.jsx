import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageButtons = () => {
        return [...Array(5)].map((_, index) => {
            const pageNumber = Math.max(1, currentPage - 2) + index;
            if (pageNumber > totalPages) return null;
            return (
                <Button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    variant={currentPage === pageNumber ? 'contained' : 'outlined'}
                    color="primary"
                    sx={{
                        margin: '0 4px',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        minWidth: 'unset',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: currentPage === pageNumber ? '#1976d2' : '#e3f2fd',
                        },
                    }}
                >
                    {pageNumber}
                </Button>
            );
        });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '30px' }}>
            {totalPages > 5 && currentPage > 3 && (
                <Button
                    onClick={() => onPageChange(1)}
                    variant="outlined"
                    color="primary"
                    sx={{
                        margin: '0 4px',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        minWidth: 'unset',
                    }}
                >
                    1
                </Button>
            )}

            {totalPages > 5 && currentPage > 3 && currentPage < totalPages - 2 && (
                <Typography sx={{ margin: '0 4px', alignSelf: 'center' }}>...</Typography>
            )}

            {renderPageButtons()}

            {totalPages > 5 && currentPage < totalPages - 2 && (
                <Typography sx={{ margin: '0 4px', alignSelf: 'center' }}>...</Typography>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
                <Button
                    onClick={() => onPageChange(totalPages)}
                    variant="outlined"
                    color="primary"
                    sx={{
                        margin: '0 4px',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        minWidth: 'unset',
                    }}
                >
                    {totalPages}
                </Button>
            )}
        </Box>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
