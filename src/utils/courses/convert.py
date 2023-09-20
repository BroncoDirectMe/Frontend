import csv

class MajorInfo:
    def __init__(self, name):
        self.name = name
        self.major_required: int | None = None
        self.major_electives: int | None = None
        self.certificate_required: int | None = None
        self.subplan_required: int | None = None
        self.specialization: int | None = None
        self.dissertation_seminar: int | None = None
        self.dissertation: int | None = None
        self.culminating_experience: int | None = None
        self.professional_practice_requirement: str | None = None
        self.general_standing: int | None = None
        self.credential_required: int | None = None

class CourseInfo:
    def __init__(self, courseID, name, units: str | None = None):
        self.courseID = courseID
        self.name = name
        self.units = units
        self.description = ''
        self.prerequisites = []

# Read the requirements file to get the majors and their requirements
# major_requirements = {}
# with open('./CourseCurriculum/2023-2024_Requirements.csv', 'r') as f:
#     reader = csv.reader(f)
#     next(reader)  # Skip the header row
#     for row in reader:
#         major_name, requirements = row
#         major_requirements[major_name] = requirements

# Read the programs file to get the courses for each major
major_courses = {}
with open('./CourseCurriculum/2023-2024_Programs.csv', 'r') as f:
    reader = csv.reader(f)
    next(reader)  # Skip the header row
    for row in reader:
        major_name, required_courses, electives = row
        # all_courses = required_courses.split(", ") + electives.split(", ")
        major_courses[major_name] = {
            "required": required_courses.split("),"),
            "electives": electives.split("),")
        }

# Convert the courses into CourseInfo objects
course_objects = {}
for major, courses in major_courses.items():
    for course in courses['required']:
        if course == '':
            continue
        units = str(course[-3:]).strip().replace(')', '').replace('(', '')
        
        parts = str(course[:-3]).split(' - ')
        courseID = parts[0]
        name = ' - '.join(parts[1:])
            
        course_objects[courseID] = CourseInfo(courseID, name, units)
        
    for course in courses['electives']:
        if course == '':
            continue
        units = str(course[-3:]).strip().replace(')', '').replace('(', '')
        
        parts = str(course[:-3]).split(' - ')
        courseID = parts[0]
        name = ' - '.join(parts[1:])
        # print(courseID, name)
            
        course_objects[courseID] = CourseInfo(courseID, name, units)

import json

# Convert CourseInfo objects to dictionaries
course_dicts = {}
for courseID, course_obj in course_objects.items():
    course_dicts[courseID] = {
        "courseID": course_obj.courseID,
        "name": course_obj.name,
        "units": course_obj.units,
        "description": course_obj.description,
        "prerequisites": course_obj.prerequisites
    }

# Export dictionaries to JSON
with open('./CourseCurriculum/courses_2023-2024.json', 'w') as f:
    json.dump(course_dicts, f, indent=4)