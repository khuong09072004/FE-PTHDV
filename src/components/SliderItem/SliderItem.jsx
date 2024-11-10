import './SliderItem.scss';
import { useState, useEffect } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { getAllItemSlider } from '../../apis/slider';

const SliderItem = () => {
    const [index, setIndex] = useState(0);
    const [sliders, setSliders] = useState([]);

    const loadAllSlider = async () => {
        try {
            const response = await getAllItemSlider();
            console.log('Response:', response);
            const result = response.data;
            setSliders(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        loadAllSlider();
    }, []);

    const handleRight = () => {
        setIndex((prevIndex) => (prevIndex === sliders.length - 1 ? 0 : prevIndex + 1));
    };

    const handleLeft = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? sliders.length - 1 : prevIndex - 1));
    };

    const determineMediaType = (url = '') => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];
        const isImage = imageExtensions.some((ext) => url.endsWith(ext));
        if (isImage) {
            return 'image';
        }

        const isVideo = videoExtensions.some((ext) => url.endsWith(ext));
        if (isVideo) {
            return 'video';
        }
        return 'empty';
    };

    return (
        <div className="slider-container">
            <div className='banner-container'>
                <div className='banner-slider' style={{ transform: `translateX(${-index * 100}%)` }}>
                    {sliders.map((item) => (
                        <div key={item.id} className='banner-item'>
                            {determineMediaType(item.url) === 'video' && (
                                <video controls className='banner-image'>
                                    <source src={item.url} type='video/mp4' />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            {determineMediaType(item.url) === 'image' && (
                                <img className='banner-image' src={item.url} alt='Slider Image' />
                            )}
                            {determineMediaType(item.url) === 'empty' && (
                                <img src='/path-to-placeholder.jpg' alt='Placeholder' className='banner-image' />
                            )}
                        </div>
                    ))}
                </div>
                <div className="btn-arrow-container">
                    <div className="btn-arrow" onClick={handleLeft}>
                        <IconChevronLeft stroke={4} className='icon' />
                    </div>
                    <div className="btn-arrow" onClick={handleRight}>
                        <IconChevronRight stroke={4} className='icon' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderItem;
