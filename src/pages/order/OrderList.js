import React, { useState, useEffect } from 'react';
import MenuCard from '../../components/BaseCard/MenuCard';
import { getTableList, getOrderList } from './OrderService';
import {
  Box,
  ListItemText,
  Button,
  Grid,
} from "@mui/material";
import { Palette } from '../../components/palette/Palette';

const OrderList = ({ nowTable, setNow , reload, setTableName}) => {

  const [tables, setTableList] = useState([]);
  const [orders, setOrderList] = useState([]);
  
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const tableList = await getTableList(localStorage.getItem('storeNo'));
        setTableList(tableList);
      } catch (error) {}
    };

    const fetchOrders = async () => {
      try {
        const orderList = await getOrderList(localStorage.getItem('storeNo'));
        setOrderList(orderList);
      } catch (error) {}
    };

    setNow(0);
    fetchTables();
    fetchOrders();
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
            >
              <MenuCard title={item.tableName}
                background={nowTable === item.tableNo? Palette.main: 'white'}
                color={nowTable === item.tableNo? Palette.sub: 'black'}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    minwidth: 120,
                    minHeight: 100,
                  }}
                  onClick={() => handleClick(item.tableNo, item.tableName)}
                >

                  {tableOrders? (
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
                                flex: '1',              // menuName이 가능한 공간을 최대한 차지
                                whiteSpace: 'nowrap',   // 텍스트가 넘칠 때 줄바꿈을 막음
                                overflow: 'hidden',     // 넘친 텍스트를 숨김
                                textOverflow: 'ellipsis' // 넘친 텍스트에 ...으로 표시
                              }}>
                                {menu.menuName}
                              </div>
                              <span style={{
                                marginLeft: '10px'  // 적절한 간격 설정
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
                  ):'테이블을 등록해 주세요'}


                </Box>
              </MenuCard>
            </Grid>
          );
        })}
      </Grid>

      
     

      
    </Box>
  );
};

export default OrderList;
