import React, { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  createFilterOptions,
  CircularProgress,
} from '@mui/material';

interface CourseInfo {
  courseID: string;
  name: string;
  units: number;
  description: string;
  prerequisites?: string[]; // string of course IDs
  notes?: string;
}

// Sample list of available courses
const courses: CourseInfo[] = [
  {
    courseID: 'CS101',
    name: 'Introduction to Computer Science',
    units: 4,
    description: 'Basics of computer science...',
    notes: 'Core course for CS majors',
  },
  {
    courseID: 'CS102',
    name: 'Data Structures',
    units: 4,
    description: 'Introduction to data structures...',
    prerequisites: ['CS101'],
  },
  {
    courseID: 'CS201',
    name: 'Algorithms',
    units: 4,
    description: 'Introduction to algorithms...',
    prerequisites: ['CS102'],
  },
  {
    courseID: 'CS202',
    name: 'Operating Systems',
    units: 4,
    description: 'Introduction to operating systems...',
    prerequisites: ['CS101'],
  },
  {
    courseID: 'CS203',
    name: 'Software Engineering',
    units: 4,
    description: 'Introduction to software engineering...',
    prerequisites: ['CS102'],
  },
  {
    courseID: 'CS204',
    name: 'Computer Networks',
    units: 4,
    description: 'Introduction to computer networks...',
    prerequisites: ['CS102'],
  },
  {
    courseID: 'CS205',
    name: 'Databases',
    units: 4,
    description: 'Introduction to databases...',
    prerequisites: ['CS102'],
  },
  {
    courseID: 'CS206',
    name: 'Web Development',
    units: 4,
    description: 'Introduction to web development...',
    prerequisites: ['CS203'],
  },
  {
    courseID: 'CS207',
    name: 'Machine Learning',
    units: 4,
    description: 'Introduction to machine learning...',
    prerequisites: ['CS203'],
  },
  {
    courseID: 'CS208',
    name: 'Artificial Intelligence',
    units: 4,
    description: 'Introduction to artificial intelligence...',
    prerequisites: ['CS207'],
  },
];

const CourseSearchBar: React.FC = () => {
  const [searchBy, setSearchBy] = useState('courseID');
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CourseInfo[]>([]);

  const handleSearchChange = (event: any, newValue: any) => {
    setCourseInfo(newValue);
  };

  useEffect(() => {
    // Fetch the list of courses when the component mounts
    // Replace with our API call to fetch courses from backend
    setOptions(courses);
  }, []);

  return (
    <div style={{ margin: '0 5vw 0 5vw' }}>
      <div style={{ marginBottom: 20 }}>
        <label>
          <input
            type="radio"
            value="courseID"
            checked={searchBy === 'courseID'}
            onChange={() => setSearchBy('courseID')}
          />
          Search by Course ID
        </label>
        <label>
          <input
            type="radio"
            value="name"
            checked={searchBy === 'name'}
            onChange={() => setSearchBy('name')}
          />
          Search by Name
        </label>
      </div>
      <Autocomplete
        id="course-search"
        sx={{
          width: '85vw',
        }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionLabel={(option) => `${option.courseID}: ${option.name}`}
        options={options}
        loading={options.length === 0}
        onChange={handleSearchChange}
        filterOptions={createFilterOptions({
          matchFrom: 'any',
          limit: 25,
        })}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a course"
            variant="outlined"
            sx={{ fontSize: '16px' }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {options.length === 0 ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      {/* display the selected course info 
      TODO: 
        - maybe actions: add buttons to add to degree progess (completed, inprogress, todo)
        - ? check the professor with highest rating for the course)
      */}
      {courseInfo && (
        <div style={{ marginTop: 10, padding: 5 }}>
          <h2>{courseInfo.name}</h2>
          <p>
            <strong>Course ID:</strong> {courseInfo.courseID}
          </p>
          <p>
            <strong>Units:</strong> {courseInfo.units}
          </p>
          <p>
            <strong>Description:</strong> {courseInfo.description}
          </p>
          {courseInfo.prerequisites && (
            <p>
              <strong>Prerequisites:</strong>{' '}
              {courseInfo.prerequisites.join(', ')}
            </p>
          )}
          {courseInfo.notes && (
            <p>
              <strong>Notes:</strong> {courseInfo.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSearchBar;
