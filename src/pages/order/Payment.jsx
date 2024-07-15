import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import PaymentTable from './PaymentTable';

const Payment = () => {
  return (
    <div>
      <Box sx={{ mt: 5 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h3">영수증 조회</Typography>
            <Box
              sx={{
                overflow: {
                  xs: 'auto',
                  sm: 'unset',
                },
              }}
            >
              <PaymentTable />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Payment;
