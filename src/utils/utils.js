export const truncateTitle = (title, wordLimit) => {
    const words = title.split(' ');
    return words.length <= wordLimit ? title : words.slice(0, wordLimit).join(' ') + '...';
};

export const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
    return words.length <= wordLimit ? description : words.slice(0, wordLimit).join(' ') + '...';
};
