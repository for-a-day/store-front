import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

const Categorys = ({ setState, categoryItem, setNow, nowCategory}) => {
  const handleAddCategory = () => {
    console.log('Add category clicked');
    setState("categoryCreate");
  };

  const handleClick = (categoryNo) => {
    setNow(categoryNo);
    setState("default");
  };

  return (
      <Box>
         <List sx={{ display: 'flex', justifyContent: 'center', p: 0 }}>
        {categoryItem && categoryItem.map((item) => (
          <ListItem
            key={item.categoryNo}
            onClick={() => handleClick(item.categoryNo)}
            sx={{
              mx: 1,
              width:100,
              ...(nowCategory === item.categoryNo && {
                color: "white",
                backgroundColor: (theme) =>
                  `${theme.palette.primary.main}!important`,
              }),
            }}
          >
            <ListItemText>{item.categoryName}</ListItemText>
          </ListItem>
        ))}
          <ListItem
            key='add'
            sx={{
              mx: 1,
              width:100,
            }}
          >
            
        <Button variant="contained" color="primary" onClick={handleAddCategory} fullWidth>
            {<AddIcon sx={{ fontSize: 20 }} />}
          </Button>

          </ListItem>
        
      </List>
      </Box>

  ); 
};

export default Categorys;
