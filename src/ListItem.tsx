import React from 'react';

interface person {
  professorName: string;
  overallRating: number;
  difficulty: number;
  reviewCount: number;
}

// eslint-disable-next-line jsdoc/require-returns
/**
 * @param props
  // eslint-disable-next-line jsdoc/require-param-description
 * @param props.list
  // eslint-disable-next-line jsdoc/require-param-description
 */
export default function ListPage(props: { list: person[] }): JSX.Element {
  return (
    // Looks of Page
    <>
      <div>
        <h1 className="title">Rate My Professor</h1>
      </div>

      {/* does the indexing work for you */}
      {props.list.map((person: person, index: number) => (
        <div
          style={{
            backgroundColor: 'dark grey',
            marginTop: '10px',
          }}
          key={index}
        >
          <p className="professorName">{person.professorName}</p>
          <p className="overallRating">{person.overallRating}</p>
          <p className="difficulty">{person.difficulty}</p>
          <p className="reviewCount">{person.reviewCount}</p>
        </div>
      ))}
    </>
  );
}
