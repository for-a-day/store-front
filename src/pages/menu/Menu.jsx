import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import Categorys from './Categorys';
import CateforyForm from './CategoryForm';
import MenuCreateForm from './MenuCreateForm';
import MenuUpdateForm from './MenuUpdateForm';
import Menus from './Menus';
import { fetchCategories, deleteCategory, STATE, fetchMenus, getMenu } from './MenuService';

const Menu = () => {
  // 상세보기 관리
  const [state, setState] = useState(STATE.DEFAULT);

  // 카테고리 관련 변수
  const [categoryItem, setCategoryItem] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [nowCategoryNo, setNowCategoryNo] = useState(-1);

  const categoryChange = () => {
    setCategoryLoading(!categoryLoading);
  };

  const menuChange = () => {
    setMenuLoading(!menuLoading);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategoryItem(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, [categoryLoading]);

  // 메뉴 관련 변수
  const [menuItems, setMenuItems] = useState([]);
  const [menuItem, setMenuItem] = useState();
  const [menuLoading, setMenuLoading] = useState(true);
  const [nowMenuNo, setNowMenuNo] = useState(-1);
  useEffect(() => {
    setState('menuUpdate');
    const loadMenu = async () => {
      try {
        const menu = await getMenu(nowMenuNo);
        setMenuItem(menu);
      } catch (error) {
        console.error('Error fetching menu', error);
      }
    };
    loadMenu();
  }, [nowMenuNo]);

  useEffect(() => {
    const loadMenus = async () => {
      try {
        const menus = await fetchMenus(nowCategoryNo);
        setMenuItems(menus);
      } catch (error) {
        console.error('Error fetching menus:', error);
      }
    };
    loadMenus();
  }, [nowCategoryNo, menuLoading]);

  const categoryDeleteClick = async () => {
    try {
      await deleteCategory(nowCategoryNo);
      categoryChange();
      setNowCategoryNo(-1);
      setState(STATE.DEFAULT);
    } catch (error) {
      console.error('카테고리 삭제 실패:', error.message);
    }
  };

  return (
    <Box>
      {/* 카테고리 */}
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Categorys
            setState={setState}
            categoryItem={categoryItem}
            setNow={setNowCategoryNo}
            nowCategory={nowCategoryNo}
          />
        </Grid>
      </Grid>

      {/* 메뉴 목록 */}
      <Grid item xs={15} container spacing={2}>
        {nowCategoryNo >= 0 ? (
          <Grid item xs={6} container spacing={2}>
            <Menus
              categoryDelete={categoryDeleteClick}
              setState={setState}
              menuItem={menuItems}
              setNow={setNowMenuNo}
              nowMenu={nowMenuNo}
            />
          </Grid>
        ) : null}

        {/* 상세보기 */}
        <Grid item xs={6}>
          {state === STATE.MENU_UPDATE ? (
            <MenuUpdateForm
              setState={setState}
              menuItem={menuItem}
              menuChange={menuChange}
              nowCategoryNo={nowCategoryNo}
            />
          ) : state === STATE.MENU_CREATE ? (
            <MenuCreateForm
              setState={setState}
              menuChange={menuChange}
              nowCategoryNo={nowCategoryNo}
            />
          ) : state === STATE.CATEGORY_CREATE ? (
            <CateforyForm setState={setState} categoryChange={categoryChange} />
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Menu;
