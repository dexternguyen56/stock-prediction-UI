import React, { Fragment } from 'react';
import './App.scss';


import Table from './Table';


const tracksData = [
  {
    name: 'Spa-Francorchamps',
    country: 'Belgium',
    length: 7.004,
    numberOfLaps: 44
  },
  {
    name: 'Circuit de Monaco',
    country: 'Monaco',
    length: 3.337,
    numberOfLaps: 78
  },
  {
    name: 'Silverstone',
    country: 'England',
    length: 5.891,
    numberOfLaps: 52
  },
  {
    name: 'Suzuka',
    country: 'Japan',
    length: 5.807,
    numberOfLaps: 53
  },
  {
    name: 'Hockenheimring',
    country: 'Germany',
    length: 4.574,
    numberOfLaps: 67
  },
];

const TableChart = (props) => {
  return (
    <Fragment>
     

      <Table 
        tableData={tracksData}
        headingColumns={['Features', 'Mean Absolute Error (MAE)', 'Root Mean Squared Error (RMSE)', 'Coefficient of determination (R2)']}
        title="Models Performance"
        breakOn="small"
      />
    </Fragment>
  );
}

export default TableChart;