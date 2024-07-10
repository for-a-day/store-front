import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions
} from "@mui/material";
import { Palette } from "../../components/palette/Palette";
import { usePopup } from "../../components/popup/PopupContext";
import { orderSocket } from "../order/OrderService";

const TOTable = () => {
  const [tableList, setTableList] = useState([]);
  const { openPopup } = usePopup();
  const[storeNo, setStoreNo] = useState(0);

  useEffect(() => {
    setStoreNo(localStorage.getItem('storeNo'));
    // const response = orderSocket();
    // console.log(response);
    // setOrders((prevOrders) => [...prevOrders, newOrder]);
  }, []);

  const createTable= ()=>{

    openPopup(
      `테이블 코드가 생성되었습니다
      ATB002`
      ,()=>{} ,true);
  }

  
  const [openQuantityDialog, setOpenQuantityDialog] = useState(false);

  const [tableCode, setTableCode] = useState('');

  const handleClickOpenQuantityDialog = async () => {

    console.log("지점 번호 : ", storeNo);
  // 서버에 데이터 전송
  
  try {
    const response = await fetch("http://localhost:9001/table", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeNo: storeNo,
      }),
    });

    if (!response.ok) {
      throw new Error("서버 응답 오류");
    }

    const result = await response.json(); // 응답을 JSON으로 파싱
    console.log("서버 응답 데이터: ", result.data);
    setTableCode(result.data.tableCode);
    setOpenQuantityDialog(true);

} catch (error) {
  if (error.response) {
    // 서버가 응답을 반환했을 때
    console.error(`Error Status: ${error.response.status}`);
    console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
    if (error.response.status === 403) {
      alert('권한이 없습니다.');
    } else {
      alert('테이블 생성 실패하였습니다.');
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

  const handleCloseQuantityDialog = async() => {
    setOpenQuantityDialog(false);
  };

  
  const cancleCreateTable = async() => {
    setOpenQuantityDialog(false);
    try {
      const response = await fetch("http://localhost:9001/table", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableCode: tableCode,
        }),
      });
  
      if (!response.ok) {
        throw new Error("서버 응답 오류");
      }
  
      setTableCode('');

    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했을 때
        console.error(`Error Status: ${error.response.status}`);
        console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
        if (error.response.status === 403) {
          alert('권한이 없습니다.');
        } else {
          alert('테이블 생성 실패하였습니다.');
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


  const getTables = async () => {
    const storeNo = localStorage.getItem('storeNo');
    console.log(storeNo);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const response = await axios.get(`http://localhost:9001/table?storeNo=${storeNo}`, config);
      const tableList = response.data.data.tableList;

      if (tableList) {
        tableList.sort((a, b) => a.tableNumber - b.tableNumber);
      }

      setTableList(tableList);
    } catch (error) {
      console.error('Error get tables:', error);
      throw error;
    }
  }

  useEffect(() => { getTables(); }, [tableCode]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  }


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
                테이블번호
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                테이블명
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                테이블코드
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                등록 날짜
              </Typography>
            </TableCell>
            <TableCell >
              <Typography color="textSecondary" variant="h6">
                상태
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>

          {tableList?(
            <TableBody>
             {tableList.map((table) => (
                <TableRow key={table.tableCode}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {table.tableNumber === -1? '미지정' :table.tableNumber }
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {table.tableName === '' ? '미지정' : table.tableName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="h6">
                      {table.tableCode}
                    </Typography>
                  </TableCell>
                  <TableCell >
                    <Typography variant="h6">{formatDate(table.registerDate)}</Typography>
                  </TableCell>
                  <TableCell >
                    <Typography variant="h6">{table.state === 1 ? '등록됨' : '등록대기중'}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            

          ) : ('등록된 테이블이 없습니다.')}

          


      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      
      <Button variant="contained" 
                       sx={{
                        color: Palette.sub,
                        background: Palette.main,
                        '&:hover': {
                          color: Palette.sub,
                          background: Palette.dark, // 마우스 호버 시 변경할 색상 지정
                        },
                        marginLeft: 'auto' // 추가된 부분
                      }}
                      onClick={() => handleClickOpenQuantityDialog()}>
                        테이블추가
                      </Button>
            </Box>


            
      <Dialog open={openQuantityDialog} onClose={handleCloseQuantityDialog}>
        <DialogTitle>테이블을 추가하세요</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
                <Typography variant="h6">테이블 코드 : {tableCode? tableCode: '테이블 코드 생성 실패'}</Typography>
               
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancleCreateTable} color="primary">
            취소
          </Button>
          <Button onClick={handleCloseQuantityDialog} color="primary">
            완료
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default TOTable;
