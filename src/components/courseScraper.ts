import { CourseMap, CourseSec, CourseSections } from '../../types/types';

// _ denotes entry that won't be displayed
export default function courseScraper(courseHTML: NodeListOf<HTMLElement>): CourseMap {
  const CourseMap: CourseMap = {};

  let sectionIndex = 0;
  courseHTML.forEach((course) => {
    const courseTitle = (course.querySelector('[id^="gh-collapsible"]') as HTMLElement)?.innerText;
    const courseSections: CourseSections = [];

    course.querySelectorAll('[id^="ACE_SSR_CLSRSLT_WRK_GROUPBOX3$"]').forEach((sec) => {
      const secObj: CourseSec = {};
      const querySelectText = (selector: string): string | undefined =>
        sec.querySelector<HTMLSpanElement>(selector)?.innerText;

      secObj.ID = querySelectText('[id^="MTG_CLASS_NBR$"]');
      secObj.Section = querySelectText('[id^="MTG_CLASSNAME$"]')?.split('\n')[0];
      secObj.Component = querySelectText('[id^="MTG_CLASSNAME$"]')?.split('\n')[1];
      secObj.Time = querySelectText('[id^="MTG_DAYTIME$"]');
      secObj.Room = querySelectText('[id^="MTG_ROOM$"]');
      secObj.Instructor = querySelectText('[id^="MTG_INSTR$"]');
      secObj.Dates = querySelectText('[id^="MTG_TOPIC$"]');
      secObj.Status = sec.querySelector('[data-gh-replace]')?.getAttribute('data-gh-replace')?.split('_')[0];
      secObj._idx = sectionIndex++;
      courseSections.push(secObj);
    });
    CourseMap[courseTitle] = courseSections;
  });
  return CourseMap;
}
