import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/BaseCard/MenuCard';
import {
  Box,
  ListItemText,
  Button,
  Grid,
  
} from "@mui/material";

const OrderList = ({tables, nowTable, setNow}) => {
  
  const handleClick = (tableNo) => {
    setNow(tableNo);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {tables && tables.map((item) => (
          <Grid item key={item.tableNo} xs={12} sm={6} md={4} lg={3}
          
          >
            <MenuCard title={item.tableName}>
            <Box
            sx={{
              textAlign: 'center',
              height: 50,
              width: 50,
              cursor: 'pointer',
              ...(nowTable === item.tableNo && {
                color: 'white',
                backgroundColor: (theme) => `${theme.palette.primary.main}!important`,
              }),
            }}
            onClick={() => handleClick(item.tableNo)}
            >

                <ListItemText>주문내역</ListItemText>
            </Box>
             
            </MenuCard>
          </Grid>
        ))}
       

      </Grid>
    </Box>
  );
};

export default OrderList;
