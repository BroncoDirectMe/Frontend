export type CourseSections = CourseSec[];

export interface CourseMap {
  [key: string]: CourseSections;
}
export interface CourseSec {
  $ID: string;
  Section: string;
  Component: string;
  Time: string;
  Room: string;
  Instructor: string;
  _Dates: string;
  Status: string;
  $Select: boolean;
  _idx: number;
}
