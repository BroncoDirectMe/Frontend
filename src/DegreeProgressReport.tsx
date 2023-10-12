import React, { Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { courseStatus as courseStatusType } from '../types/types';

const rootNode = document.getElementById('app');
if (rootNode != null) {
  createRoot(rootNode).render(<App />);
}

/**
 *
 * @returns User's Course Status
 */
function CourseStatus(): JSX.Element {
  const [courseStatus, setCourseStatus] = useState<courseStatusType | null>(
    null
  );

  useEffect(() => {
    const courseStatusFetch = async (): Promise<void> => {
      const response = (await chrome.storage.local.get([
        'major',
      ])) as courseStatusType;
      setCourseStatus(response);
    };
    courseStatusFetch().catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(courseStatus, null, 4)}</pre>
    </div>
  );
}

/**
 * @returns Main app component
 */
function App(): JSX.Element {
  return (
    <>
      <Suspense fallback={null}>
        <CourseStatus />
      </Suspense>
    </>
  );
}
