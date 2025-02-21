import React, { useState, useEffect } from 'react';
import { getPaymentList, deletePayment } from './OrderService';
import { Palette } from '../../components/palette/Palette';
import {
  Typography,
  Box,
  Table,
  TableBody,
  Button,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const PaymentTable = () => {
  const [paymentList, setPaymentList] = useState([]);

  const [reload, setReload] = useState(true);

  const reloading = () => {
    setReload(!reload);
  };
  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const userData = sessionStorage.getItem('user');

        const storeNo = JSON.parse(userData).storeNo;
        const response = await getPaymentList(storeNo);
        if (response != 'error') {
          setPaymentList(response);
        }
      } catch (error) {}
    };
    fetchPayment();
  }, [reload]);

  const clickRefund = async (orderNo) => {
    console.log('환불 확인 버튼 눌림');
    try {
      const response = await deletePayment(orderNo);
      if (response != 'error') {
        setOpenDialog(false);
      reloading();
      }
    } catch (error) {}
    // setOpenDialog(false);
  };

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = (payment) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
  };

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: 'nowrap',
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                No
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                영수증 번호
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                결제금액
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                결제 방법
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                결제 일시
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                테이블 번호
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                영수증
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                환불
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentList &&
            paymentList.map((payment, index) => (
              <TableRow key={payment.orderNo}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {payment.orderNo}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {payment.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{payment.paymentMethod}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{payment.orderDate}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{payment.tableNumber}</Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      color: Palette.sub,
                      background: Palette.main,
                      '&:hover': {
                        color: Palette.sub,
                        background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                      },
                      marginLeft: 'auto', // 추가된 부분
                    }}
                  >
                    재출력
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      color: Palette.sub,
                      background: Palette.main,
                      '&:hover': {
                        color: Palette.sub,
                        background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                      },
                      marginLeft: 'auto', // 추가된 부분
                    }}
                    disabled={payment.state === 99}
                    onClick={() => handleClickOpenDialog(payment)}
                  >
                    환불
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>환불처리 하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            영수증번호 : {selectedPayment ? selectedPayment.orderNo : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button
            onClick={() => clickRefund(selectedPayment ? selectedPayment.orderNo : 0)}
            color="primary"
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentTable;
