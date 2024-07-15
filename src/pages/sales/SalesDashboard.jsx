import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const SalesDashboard = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dailySales, setDailySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [sales, setSales] = useState([]);

  const getSales = async () => {
    const userData = sessionStorage.getItem('user');

    const storeNo = JSON.parse(userData).storeNo;

    console.log(storeNo);
    try {
      const userData = sessionStorage.getItem('user');

      const token = JSON.parse(userData).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:9001/sales?storeNo=${storeNo}`, config);

      if (response.status !== 200) {
        alert('서버 응답 오류');
        return 'error';
      }

      const salesDetail = response.data.data.salesDetail;
      console.log(response.data.data);
      console.log(salesDetail);
      setSales(salesDetail);
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했을 때
        console.error(`Error Status: ${error.response.status}`);
        console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
        if (error.response.status === 403 || error.response.status === 401) {
          alert('권한이 없습니다.');
        } else {
          alert('매출 조회에 실패하였습니다.');
        }
      } else if (error.request) {
        // 요청이 서버에 도달하지 못했을 때
        console.error('No response received from server');
        alert('서버에 연결할 수 없습니다.');
      } else {
        // 요청을 설정하는 중에 오류가 발생했을 때
        console.error(`Error Message: ${error.message}`);
        alert('알 수 없는 오류가 발생하였습니다.');
      }
    }
  };

  useEffect(() => {
    getSales();
    // Function to fetch sales data (mocked for example)
    fetchSalesData();
  }, []);

  const fetchSalesData = () => {
    // Mocked data, replace with actual API calls if available
    const dailySalesData = 15000; // Example daily sales amount
    const monthlySalesData = 450000; // Example monthly sales amount

    setDailySales(dailySalesData);
    setMonthlySales(monthlySalesData);

    // Update current date and time when data is fetched
    setCurrentDateTime(new Date());
  };

  // Function to update current date and time every second
  useEffect(() => {
    setCurrentDateTime(new Date());
  }, []);

  return (
    <Box>
      <Typography variant="body1" gutterBottom style={{ textAlign: 'right' }}>
        {currentDateTime.toLocaleString()} 기준
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                오늘 하루 매출
              </Typography>
              <Typography variant="body1">{sales.todaySalesCnt} 원</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                이번달 매출
              </Typography>
              <Typography variant="body1">{sales.thisMonthSalesCnt} 원</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                오늘 결제 건수
              </Typography>
              <Typography variant="body1">{sales.todayPaymentCnt} 건</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                이번달 결제 건수
              </Typography>
              <Typography variant="body1">{sales.thisMonthPaymentCnt} 건</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SalesDashboard;
