import React, { useState, useEffect } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  Button,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
} from '@mui/material';
import { getOrderDetail, orderComplete } from './OrderService';
import { Palette } from '../../components/palette/Palette';

const OrderDetail = ({ nowTable, loading, nowTableName }) => {
  const [order, setOrder] = useState();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await getOrderDetail(nowTable);
        const total = response.orderList.reduce((sum, order) => sum + order.amount, 0);
        setTotalAmount(total);
        setOrder(response);
      } catch (error) {}
    };
    fetchOrderDetail();
    console.log('들어와야해애');
  }, [nowTableName]);

  const clickClear = async () => {
    try {
      const response = await orderComplete(order.tableNo);
      setOpenDialog(false);
      loading();
    } catch (error) {}
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div>
        <Card variant="outlined">
          <Box sx={{ padding: '15px 30px' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '500' }}>
              <Typography variant="body1">
                {nowTable ? nowTableName : '선택된 테이블이 없습니다'}
              </Typography>
            </Typography>
          </Box>
          <Divider />
          <CardContent sx={{ padding: '30px' }}>
            <Box>
              <ListItemText>
                <div>
                  {order &&
                    order.orderList.map((order) => (
                      <div key={order.orderNo}>
                        {order.orderMenuList &&
                          order.orderMenuList.map((menu) => (
                            <div
                              key={menu.menuNo}
                              style={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                              <span>{menu.menuName}</span>
                              <span> X {menu.quantity}</span>
                            </div>
                          ))}
                        <div style={{ marginTop: '1rem' }}>가격 : {order.amount} 원</div>

                        <Divider orientation="horizontal" />
                      </div>
                    ))}
                </div>

                <div style={{ marginTop: '1rem' }}>
                  {nowTable ? `총 금액 : ${totalAmount} 원` : ''}
                </div>
              </ListItemText>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpenDialog}
                sx={{
                  color: Palette.sub,
                  background: Palette.main,
                  '&:hover': {
                    color: Palette.sub,
                    background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                  },
                }}
                disabled={!order || !order.orderList || order.orderList.length <= 0}
              >
                Clear
              </Button>

              <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to="../payment"
                sx={{
                  color: Palette.sub,
                  background: Palette.main,
                  '&:hover': {
                    color: Palette.sub,
                    background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                  },
                }}
              >
                영수증 관리
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>테이블을 비우시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>테이블 번호 : {order ? order.tableNo : ''}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: Palette.sub,
              background: Palette.main,
              '&:hover': {
                color: Palette.sub,
                background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
              },
            }}
          >
            취소
          </Button>
          <Button
            onClick={clickClear}
            sx={{
              color: Palette.sub,
              background: Palette.main,
              '&:hover': {
                color: Palette.sub,
                background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
              },
            }}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderDetail;
