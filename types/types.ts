export type CourseSections = CourseSec[];

export interface CourseMap {
  [key: string]: CourseSections;
}
export interface CourseSec {
  ID?: string;
  Section?: string;
  Component?: string;
  Time?: string;
  Room?: string;
  Instructor?: string;
  Dates?: string;
  Status?: string;
  _idx?: number;
}
