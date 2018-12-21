import React, { Component } from 'react'
import { LineChart, Line, YAxis } from 'recharts';

export default class Chart extends Component {

  render() {

      let grades = [...this.props.grades];

      let gradesList = grades.map((grade) => {
          return grade.grade;
      })

      

      console.log(gradesList);
    return (
      <div>

          <LineChart width={300} height={150} data={grades} >
          <YAxis dataKey="grade" domain={['1', '5']} tickSize={5} minTickGap={2}/>
          <Line type="monotone" dataKey="grade" stroke="#8884d8" strokeWidth={2}/>
          </LineChart>
        
      </div>
    )
  }
}
