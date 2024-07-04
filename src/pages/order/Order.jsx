import React, { useState, useEffect } from 'react';
import { Grid, Box, Divider } from '@mui/material';
import OrderList from './OrderList';

const Order = () => {
  const [tabls, setTables] = useState([]);
  const [nowTable, setNowTable] = useState([-1]);

  return (
    <>
      <Grid container spacing={2}>
        {/* 메뉴 목록 */}
        <Grid item xs={5}>
          <OrderList tables={tabls} nowTable={nowTable} setNow={setNowTable} />
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" />
        </Grid>
        {/* 상세보기 */}
        <Grid item xs={6}>
          dfdfdf
        </Grid>
      </Grid>
    </>
  );
};

export default Order;
