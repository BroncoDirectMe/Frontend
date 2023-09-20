import React, { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  createFilterOptions,
  CircularProgress,
} from '@mui/material';
import useFetchCourses from '../utils/hooks/useFetchCourses';
import { CourseInfo } from '../utils/types';

const CourseSearchBar: React.FC = () => {
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(null);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<CourseInfo[]>([]);

  const handleSearchChange = (event: any, newValue: any) => {
    setCourseInfo(newValue);
  };

  const { fetchAllCourses } = useFetchCourses();

  useEffect(() => {
    fetchAllCourses().then((data) => {
      if (data) {
        setOptions(data);
      } else {
        setOptions([]);
      }
    });
  }, []);

  return (
    <div style={{ margin: '0 5vw 0 5vw' }}>
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
      {courseInfo && (
        <div style={{ marginTop: 10, padding: 5 }}>
          <h2>{courseInfo.name}</h2>
          <p>
            <strong>Course ID:</strong> {courseInfo.courseID}
          </p>
          <p>
            <strong>Units:</strong> {courseInfo.units}
          </p>

          {courseInfo.description !== '' && (
            <p>
              <strong>Description:</strong> {courseInfo.description}
            </p>
          )}
          {courseInfo.prerequisites && courseInfo.prerequisites.length !== 0 && (
            <p>
              <strong>Prerequisites:</strong>{' '}
              {courseInfo.prerequisites.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSearchBar;
