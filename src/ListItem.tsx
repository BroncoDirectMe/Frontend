import React from 'react';

export default function ListPage(props: any): JSX.Element {
  {
    return (
      //Looks of Page
      <>
        <div>
          <h1 className="title">Rate My Professor</h1>
        </div>

        {/* does the indexing work for you */}
        {props.list.map((person: any, index: number) => (
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
}
