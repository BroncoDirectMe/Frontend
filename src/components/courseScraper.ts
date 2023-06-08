import { CourseMap, CourseSec, CourseSections } from '../../types/types';

/**
 * Scrapes the HTML for the course data
 *  _ denotes an entry that won't be displayed
 *  $ denotes an entry that is a link and displayed
 * @param courseHTML The HTML to scrape
 */
export default function courseScraper(
  courseHTML: NodeListOf<HTMLElement>
): CourseMap {
  const CourseMap: CourseMap = {};

  let sectionIndex = 0;
  courseHTML.forEach((course) => {
    const courseTitle = (
      course.querySelector('[id^="gh-collapsible"]') as HTMLElement
    )?.innerText;
    const courseSections: CourseSections = [];

    course
      .querySelectorAll('[id^="ACE_SSR_CLSRSLT_WRK_GROUPBOX3$"]')
      .forEach((sec) => {
        const querySelectText = (selector: string): string => {
          const query = sec.querySelector<HTMLSpanElement>(selector);
          if (!query) console.error('query is null', selector);
          return query ? query.innerText : 'null';
        };
        const classStatus = sec
          .querySelector('[data-gh-replace]')
          ?.getAttribute('data-gh-replace')
          ?.split('_')[0];

        const secObj: CourseSec = {
          $ID: querySelectText('[id^="MTG_CLASS_NBR"]'),
          Section: querySelectText('[id^="MTG_CLASSNAME"]')?.split('\n')[0],
          Component: querySelectText('[id^="MTG_CLASSNAME"]')?.split('\n')[1],
          Time: querySelectText('[id^="MTG_DAYTIME"]'),
          Room: querySelectText('[id^="MTG_ROOM"]'),
          Instructor: querySelectText('[id^="MTG_INSTR"]'),
          _Dates: querySelectText('[id^="MTG_TOPIC"]'),
          Status: classStatus ?? 'null',
          $Select: sec.querySelector('[id*="PB_SELECT"]') !== null,
          _idx: sectionIndex++,
        };
        courseSections.push(secObj);
      });
    CourseMap[courseTitle] = courseSections;
  });
  return CourseMap;
}
