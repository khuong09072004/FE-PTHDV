import ReactLoading from 'react-loading';

const LoadingSpinner = ({ type = 'spin', color = '#3498db' }) => {
  return (
    <ReactLoading type={type} color={color} height={50} width={50} />
  );
};

export default LoadingSpinner;
