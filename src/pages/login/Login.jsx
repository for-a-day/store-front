import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import axios from 'axios';

const Login = ({ setLogin }) => {
  const handleConfirmClick = () => {
    login();
  };

  const login = async () => {
    const rprName = document.getElementById('rpr-name').value;
    const storeCode = document.getElementById('store-code').value;

    fetch('http://localhost:9001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rprName: rprName,
        storeCode: storeCode,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('서버 응답 오류');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLogin('active');
        localStorage.setItem('storeNo', data.data.storeInfo.storeNo);
        localStorage.setItem('storeName', data.data.storeInfo.storeName);
        localStorage.setItem('rprName', data.data.storeInfo.rprName);
        localStorage.setItem('warningCount', data.data.storeInfo.warningCount);
        localStorage.setItem('storeCode', data.data.storeInfo.storeCode);
      })
      .catch((error) => {
        console.error('로그인 실패:', error.message);
      });
  };

  return (
    <div>
      <Card variant="outlined">
        <Box sx={{ padding: '15px 30px' }}>
          <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>로그인</Typography>
        </Box>
        <Divider />
        <CardContent sx={{ padding: '30px' }}>
          <form>
            <TextField
              id="rpr-name"
              label="이름"
              type="text"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField id="store-code" label="지점코드" type="text" fullWidth sx={{ mb: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleConfirmClick}>
                로그인
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
