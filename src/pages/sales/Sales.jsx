import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import SalesDashboard from './SalesDashboard';

const Sales = () => {
  return (
    <Box sx={{ mt: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3">매출</Typography>
          <Box
            sx={{
              overflow: {
                xs: 'auto',
                sm: 'unset',
              },
            }}
          >
            <SalesDashboard />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Sales;
