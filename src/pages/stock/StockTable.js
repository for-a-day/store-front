import React, { useEffect, useState } from "react";
import { Palette } from "../../components/palette/Palette";
import axios from 'axios';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";


const StockTable = () => {
  const [stockList, setStockLIst] = useState([]);

  const [stockLoad, setStockLoad] = useState('active');
  const stockReload = () =>{
    setStockLoad(!stockLoad);
  }

  const getStocks = async () => {
    const userData = sessionStorage.getItem('user');

    const storeNo = JSON.parse(userData).storeNo;
    console.log(storeNo);

    const token = JSON.parse(userData).token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`http://localhost:9001/stock?storeNo=${storeNo}`, config);

      if (response.status !== 200) {
        alert("서버 응답 오류");
        return "error";
      }


      const stockLIst = response.data.data.stockList;
      setStockLIst(stockLIst);
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했을 때
        console.error(`Error Status: ${error.response.status}`);
        console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
        if (error.response.status === 403 || error.response.status === 401) {
          alert('권한이 없습니다.');
        } else {
          alert(' 재고 조회에 실패하였습니다.');
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
  }

  useEffect(()=>{getStocks();}, [stockLoad]);

  const orderCompleteClick = (porderNo) => {
    try {
      purchaseOrderComplete(porderNo);
    } catch (error) {
      console.error('Error get orderComplete:', error);
      // throw error;
    }

  }
  const purchaseOrderComplete = async (porderNo) => {
    const state = 1;
    const userData = sessionStorage.getItem('user');
    const token = JSON.parse(userData).token;
  
    try {
      const response = await fetch('http://localhost:9001/purchaseorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          state: state,
          porderNo: porderNo,
        }),
      });
  
      if (response.status !== 200) {
        alert('서버 응답 오류');
        return 'error';
      }
  
      const data = await response.json();
      stockReload();
      console.log(data);
      return data;
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했을 때
        console.error(`Error Status: ${error.response.status}`);
        console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
        if (error.response.status === 403 || error.response.status === 401) {
          alert('권한이 없습니다.');
        } else {
          alert('입고완료 처리에 실패하였습니다.');
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
      return 'error';
    }
  };
  
  
  const orderClick = () => {
    if(selectedStock){
        try {
          purchaseOrder();
        } catch (error) {
          if (error.response) {
            // 서버가 응답을 반환했을 때
            console.error(`Error Status: ${error.response.status}`);
            console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
            if (error.response.status === 403 || error.response.status === 401) {
              alert('권한이 없습니다.');
            } else {
              alert(' 발주 요청 실패하였습니다.');
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
          throw error;
        }
    }
    else{
      alert('선택된 재고가 없습니다.');
    }
  }

  const purchaseOrder = async () => {
    const userData = sessionStorage.getItem('user');
    const token = JSON.parse(userData).token;
  
    try {
      const response = await fetch('http://localhost:9001/purchaseorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: poQuantity,
          stockNo: selectedStock.stockNo,
        }),
      });
  
      if (response.status !== 200) {
        alert('서버 응답 오류');
        return 'error';
      }
  
      const data = await response.json();
      console.log(data);
      stockReload();
      return data;
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했을 때
        console.error(`Error Status: ${error.response.status}`);
        console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
        if (error.response.status === 403 || error.response.status === 401) {
          alert('권한이 없습니다.');
        } else {
          alert('발주 신청 실패하였습니다.');
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
      return 'error';
    }
  };
  

    

  const [openPoDialog, setOpenPoDialog] = useState(false);
  const [openQuantityDialog, setOpenQuantityDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [poQuantity, setPoQuantity] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleClickOpenPoDialog = (stock) => {
    setSelectedStock(stock);
    setPoQuantity(stock.poQuantity);
    setOpenPoDialog(true);
  };

  const handleClickOpenQuantityDialog = (stock) => {
    setSelectedStock(stock);
    setQuantity(stock.quantity);
    setOpenQuantityDialog(true);
  };

  const handleClosePoDialog = () => {
    setOpenPoDialog(false);
    setSelectedStock(null);
    setPoQuantity("");
  };

  const handleCloseQuantityDialog = () => {
    setOpenQuantityDialog(false);
    setSelectedStock(null);
    setQuantity("");
  };

  const handlePoQuantityChange = (e) => {
    setPoQuantity(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleSavePoQuantity = () => {
    orderClick();
    handleClosePoDialog();
  };

  const handleSaveQuantity = () => {
    if (selectedStock) {
      selectedStock.quantity = quantity;
    }
    handleCloseQuantityDialog();
  };

  return (
    <>
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
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
                상품명
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                재고량
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                발주량
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                공급가
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                최근 입고 날짜
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                관리
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>


        {stockList ? (
          <TableBody>
            {stockList && stockList.map((stock, index) => (
              <TableRow key={stock.stockNo}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  >
                    {index + 1}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {stock.menuName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      color:  Palette.sub,
                      // cursor: "pointer",
                      backgroundColor: Palette.main
                    }}
                    size="small"
                    label={stock.quantity === 0?'재고 없음' : stock.quantity}
                    // onClick={() => handleClickOpenQuantityDialog(stock)}
                  ></Chip>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                        >

                        <Chip
                          sx={{
                            pl: "4px",
                            pr: "4px",
                            color:  Palette.sub,
                            backgroundColor: Palette.main
                          }}
                          size="small"
                          label={stock.poQuantity?stock.poQuantity : '발주 없음'}

                        ></Chip>


                      </Typography>
                      <Typography
                        color="textSecondary"
                        sx={{
                          fontSize: "13px",
                        }}
                      >
                        {stock.poPrice?'총 ' + stock.poPrice +'원': ''}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell >
                  <Typography variant="h6">{stock.supplyPrice}원</Typography>
                </TableCell>
                <TableCell >
                  <Typography variant="h6">{stock.lastStockDate}</Typography>
                </TableCell>
                <TableCell >
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", mt: 2 }}
                  >
                    {stock.poNo ? (
                      <Button variant="contained" sx={{
                        color: Palette.sub,
                        background: Palette.main,
                        '&:hover': {
                          color: Palette.sub,
                          background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                        },
                      }} onClick={() => orderCompleteClick(stock.poNo)}>
                        입고완료
                      </Button>
                    ) : (
                      <Button variant="contained" 
                       sx={{
                        color: Palette.sub,
                        background: Palette.main,
                        '&:hover': {
                          color: Palette.sub,
                          background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                        },
                      }}
                      onClick={() => handleClickOpenPoDialog(stock)}>
                        발주신청
                      </Button>
                    )}
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : ('등록된 재고가 없습니다.')}
      </Table>

      <Dialog open={openPoDialog} onClose={handleClosePoDialog}>
        <DialogTitle>발주량 입력</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedStock ? (
              <>
                <Typography variant="h6">상품명: {selectedStock.menuName}</Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="poQuantity"
                  label="발주량"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={poQuantity}
                  onChange={handlePoQuantityChange}
                />
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
             sx={{
              color: Palette.sub,
              background: Palette.main,
              '&:hover': {
                color: Palette.sub,
                background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
              },
            }}
          onClick={handleClosePoDialog} color="primary">
            취소
          </Button>
          <Button
             sx={{
              color: Palette.sub,
              background: Palette.main,
              '&:hover': {
                color: Palette.sub,
                background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
              },
            }}
          onClick={handleSavePoQuantity} color="primary">
            신청
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openQuantityDialog} onClose={handleCloseQuantityDialog}>
        <DialogTitle>재고량 입력</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedStock ? (
              <>
                <Typography variant="h6">상품명: {selectedStock.menuName}</Typography>
                <TextField
                  autoFocus
                  margin="dense"
                  id="quantity"
                  label="재고량"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseQuantityDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleSaveQuantity} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StockTable;
