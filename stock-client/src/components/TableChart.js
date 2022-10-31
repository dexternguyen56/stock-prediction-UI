import React, { Fragment } from 'react';
import './App.scss';


import Table from './Table';



const TableChart = ({stockMetrics}) => {
  return (
    <Fragment>
     
      <Table 
        tableData={stockMetrics}
        headingColumns={['Features', 'Mean Absolute Error (MAE)', 'Root Mean Squared Error (RMSE)', 'Coefficient of determination (R2)']}
        title="Models Performance"
        breakOn="small"
      />
    </Fragment>
  );
}

export default TableChart;