import { Typography } from '@mui/material';
import React from 'react';
import {
    BlogCard,
    SalesOverview,
    ProductPerformance,
    DailyActivities,
  } from "../../views/dashboards/dashboard1-components";

const Sales = () => {
  return (
    <div>
      <SalesOverview />
      <ProductPerformance />
    </div>
  );
};

export default Sales;