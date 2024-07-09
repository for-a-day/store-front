import React, { useState, useEffect } from 'react';
import { Palette } from '../../components/palette/Palette';
import Header from '../../layout/header/Header';
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

    try {
      const response = await axios.post('http://localhost:9001/login', {
        rprName,
        storeCode,
      });
      console.log(response.data.store);
      // JWT 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      const data = response.data.store;
      localStorage.setItem('storeNo', data.storeNo);
      localStorage.setItem('storeName', data.storeName);
      localStorage.setItem('rprName', data.rprName);
      localStorage.setItem('warningCount', data.warningCount);
      localStorage.setItem('storeCode', data.storeCode);
      // 로그인 성공 후 처리 (예: 리디렉션)
      alert('로그인 성공');
      setLogin(true);
    } catch (error) {
      alert('로그인 실패');
    }

    // fetch('http://localhost:9001/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     rprName: rprName,
    //     storeCode: storeCode,
    //   }),
    // })
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       throw new Error('서버 응답 오류');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setLogin('active');
    //     localStorage.setItem('storeNo', data.data.storeInfo.storeNo);
    //     localStorage.setItem('storeName', data.data.storeInfo.storeName);
    //     localStorage.setItem('rprName', data.data.storeInfo.rprName);
    //     localStorage.setItem('warningCount', data.data.storeInfo.warningCount);
    //     localStorage.setItem('storeCode', data.data.storeInfo.storeCode);
    //   })
    //   .catch((error) => {
    //     console.error('로그인 실패:', error.message);
    //   });
  };

  return (
    <div>
      <Header
        sx={{
          backgroundColor: Palette.main,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Card variant="outlined" sx={{ width: 500 }}>
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

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleConfirmClick}
                  sx={{
                    color: Palette.sub,
                    background: Palette.main,
                    '&:hover': {
                      color: Palette.sub,
                      background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                    },
                  }}
                >
                  로그인
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
