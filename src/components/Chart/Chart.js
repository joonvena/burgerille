import React, { Component } from 'react'
import { LineChart, Line } from 'recharts';

export default class Chart extends Component {

  render() {

      let grades = [...this.props.grades];

      let gradesList = grades.map((grade) => {
          return grade.grade;
      })

      console.log(gradesList);
    return (
      <div>

          <LineChart width={300} height={300} data={grades} >
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          </LineChart>
        
      </div>
    )
  }
}
