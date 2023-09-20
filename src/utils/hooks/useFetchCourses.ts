// useFetchCourses.js
import { useState } from 'react';
import { CourseInfo } from '../types';

const useFetchCourses = () => {
  const [loading, setLoading] = useState(false);

  const fetchAllCourses = async (): Promise<CourseInfo[] | undefined> => {
    setLoading(true);
    try {
      const response = await fetch('/courses/2023-2024.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const coursesArray: CourseInfo[] = Object.values(data);
      return coursesArray;
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchAllCourses,
    loading,
  };
};

export default useFetchCourses;
