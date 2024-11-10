import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { getAllItemCourse } from "../../apis/course";
import Course from "../Course/Course";


const CourseItem = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const LoadAllCourse = async () => {
        setLoading(true); 
        setError(null); 
        try {
            const res = await getAllItemCourse()
            console.log('Response', res);
            setCourses(res.data); 
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError("Failed to load courses"); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        LoadAllCourse();
    }, []);

    if (loading) {
        return <Typography variant="h6">Đang tải khóa học...</Typography>; 
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                What to learn next ?
            </Typography>
            <Course courses={courses}/>
        </Container>
    );
};

export default CourseItem;
