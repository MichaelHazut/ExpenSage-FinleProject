import { useFetchGet } from '../../../../Hooks/useFetchGet';
import { useFetchPost } from '../../../../Hooks/useFetchPost';
import React, { useState, useImperativeHandle, useEffect } from 'react';
import { Box, Button, Grid, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import Expense from '../../../../Models/ExpenseModel';
import CloseIcon from '@mui/icons-material/Close';

import apiUrls from '../../../../Data/ApiUrls';

export const CreateExpenseForm = React.forwardRef(({ loggedUser, initAddExpense, fetchPostExpense }, ref) => {

  const { response, getFetch } = useFetchGet(apiUrls.getCategories(loggedUser.id));
  const { postResponse: categoryResponse, postFetch: categoryPostFetch } = useFetchPost(apiUrls.postCategory);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date());

  const [addCategory, setAddCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categories, setCategories] = useState([
    'Groceries',
    'Rent',
    'Bills',
  ]);
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const currencies = ['$', '₪'];


  useEffect(() => {
    getFetch();
  }, []);

  useEffect(() => {
    if (response != null) {
      const categoryNames = response.map(item => item.name);
      setCategories(prev => [...new Set([...prev, ...categoryNames])]);
    }
  }, [response]);


  useEffect(() => {
    if (categoryResponse) {
      setCategories(prev => [...prev, categoryResponse.name]);
      setCategoryValue(categoryResponse);
      const expenseProps = {
        user: loggedUser,
        expenseCategory: categoryResponse,
        title: title,
        currency: currencies[currencyIndex],
        price: price,
        date: date,
      };

      const expense = new Expense(expenseProps);
      fetchPostExpense(expense.state);
    }
  }, [categoryResponse]);


  const createNewCategory = () => {
    categoryPostFetch({ name: categoryValue });
  };

  const handleExpenseSubmit = () => {
    if (addCategory) {
      createNewCategory();
      return
    }
    const expenseProps = {
      user: loggedUser,
      expenseCategory: { name: categories[categoryIndex] },
      title: title,
      currency: currencies[currencyIndex],
      price: price,
      date: date,
    };

    const expense = new Expense(expenseProps);
    fetchPostExpense(expense.state);
  };

  useImperativeHandle(ref, () => ({
    saveExpense: handleExpenseSubmit,
  }));

  const changeCurrency = () => {
    setCurrencyIndex((prevIndex) => (prevIndex >= currencies.length - 1 ? 0 : prevIndex + 1));
  };

  const initCategoryCreation = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory == -1) {
      setAddCategory(true);
    } else {
      setAddCategory(false);
      setCategoryIndex(selectedCategory);
    }
  };


  return (
    <>
      {initAddExpense ? (

        <Box
          sx={{
            backgroundColor: '#D0F5E2',
            border: '1px solid #ccc',
            borderRadius: '5px',
            mb: 1,
          }}>
          <Grid
            container
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            sx={{
              borderRadius: '4px',
              padding: '16px',
              maxWidth: 1200,
              margin: '0 auto',
              overflow: 'hidden',
            }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
                {addCategory ? (
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    label={addCategory ? 'New Category' : 'Category'}
                    placeholder="Add Category"
                    value={categoryValue}
                    onChange={(e) => setCategoryValue(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={() => setAddCategory(false)}>
                            <CloseIcon />
                          </Button>
                        </InputAdornment>
                      ),
                      inputProps: { min: '0', step: '0.01' },
                    }}
                    fullWidth
                  />
                ) : (
                  <Select
                    id="formSelect"
                    onChange={initCategoryCreation}
                    value={String(categoryIndex)}
                    size="small"
                    displayEmpty
                    renderValue={() => (categoryIndex === 0 ? 'Select Category' : categories[categoryIndex])}
                    fullWidth
                  >
                    <MenuItem value='' disabled>
                      Select Category
                    </MenuItem>
                    {categories.map((category, i) => (
                      <MenuItem value={String(i)} key={category + i}>
                        {category}
                      </MenuItem>
                    ))}
                    <MenuItem value={-1}>
                      Add New
                    </MenuItem>
                  </Select>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}  >
              <TextField
                label="Title"
                variant="outlined"
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                onChange={(e) => setPrice(e.target.value)}
                label="Price"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Button variant="body2" onClick={changeCurrency} sx={{ px: 1, minWidth: 0 }}>
                        {currencies[currencyIndex]}
                      </Button>
                    </InputAdornment>
                  ),
                  inputProps: { min: '0', step: '0.01' },
                }}
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Date"
                onChange={(e) => setDate(e.target.value)}
                type="date"
                variant="outlined"
                size="small"
                value={date}
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          </Grid>
        </Box>
      ) : <></>}
    </>
  );
})