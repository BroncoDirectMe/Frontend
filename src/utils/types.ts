export enum CourseStatus {
  FINISHED = 'FINISHED',
  INPROGRESS = 'IN PROGRESS',
  TODO = 'TODO',
}

export interface CourseInfo {
  courseID: string;
  name: string;
  units: string;
  description: string;
  prerequisites?: string[]; // string of course IDs
  status?: CourseStatus; // Optional status property
}
