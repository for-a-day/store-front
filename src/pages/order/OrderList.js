import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/BaseCard/MenuCard';
import { getTableList, getOrderList } from './OrderService';
import {
  Box,
  ListItemText,
  Grid,
  Typography
} from "@mui/material";
import { Palette } from '../../components/palette/Palette';

const OrderList = ({ nowTable, setNow , reload, setTableName}) => {

  const [tables, setTableList] = useState([]);
  const [orders, setOrderList] = useState([]);

  // 스토어 넘버 세션에서 가져오기
  
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const userData = sessionStorage.getItem('user');
    
        const storeNo = JSON.parse(userData).storeNo;
    
        const tableList = await getTableList(storeNo);
        if(tableList !== "error"){
          setTableList(tableList);
        }
        else{
          return "error";
        }
      } catch (error) {return error}
    };

    const fetchOrders = async () => {
      try {
        const userData = sessionStorage.getItem('user');
    
        const storeNo = JSON.parse(userData).storeNo;
        const orderList = await getOrderList(storeNo);
        if(orderList){
          setOrderList(orderList);
        }
      } catch (error) {return error}
    };

    const response = fetchTables();
    if(response !== "error"){
      setNow(0);
    fetchOrders();
    }
  }, [reload]);


  const handleClick = (tableNo, tableName) => {
    setNow(tableNo);
    setTableName(tableName);
  };


  return (
    <Box>
      <Grid container spacing={2}>
        {tables && tables.map((item) => {
          const tableOrders = orders.filter(order => order.tableNo === item.tableNo);
          const totalAmount = tableOrders.reduce((sum, order) => sum + order.amount, 0);
          console.log("주문 내역 : ", tableOrders);

          return (
            <Grid item key={item.tableNo} xs={12} sm={6} md={4} lg={4}
            style={{
              minWidth: '180px', 
              maxWidth: '180px',
              maxHeight: '250px', 
              minHeight: '250px',
              }}
            >
            {tableOrders? (
              <MenuCard title={item.tableName}
                background={nowTable === item.tableNo? Palette.main: 'white'}
                color={nowTable === item.tableNo? Palette.sub: 'black'}
                onClick={() => handleClick(item.tableNo, item.tableName)}
                children ={
<Box
                  sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >

                     <ListItemText>
                     <div>
                       {tableOrders.map(order => (
                         <div key={order.orderNo}>
                           {order.orderMenuList.map(menu => (
                             <div key={menu.menuNo} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}>
                              <div style={{
                                flex: '1',              
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }}>
                                {menu.menuName}
                              </div>
                              <span style={{
                                marginLeft: '10px'
                              }}>
                                x{menu.quantity}
                              </span>
                            </div>
                            
                           ))}
                         </div>
                       ))}
                     </div>
                     <div style={{ marginTop: '1rem' }}>{totalAmount === 0?'':totalAmount +' 원'}</div>
                   </ListItemText>
                </Box>

                }

              />
                  ):
                  
                  <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  테이블을 등록해 주세요
                </Typography>}
            </Grid>
          );
        })}
      </Grid>

      
     

      
    </Box>
  );
};

export default OrderList;
