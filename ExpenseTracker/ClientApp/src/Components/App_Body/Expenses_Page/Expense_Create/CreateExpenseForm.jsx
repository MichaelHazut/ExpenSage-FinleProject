import React, { useState, useImperativeHandle, useEffect } from 'react';

import { useFetchGet } from '../../../../Hooks/useFetchGet';
import { useFetchPost } from '../../../../Hooks/useFetchPost';

import { BoxContainer, GridContainer, GridItem, CategoryTextFields, SelectCategory, TitleTextField, CategoryBox, PriceTextField, DateTextField } from '../../../../Styles/ExpenseFormDesign';
import Expense from '../../../../Models/ExpenseModel';
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
        <BoxContainer>
          <GridContainer>
            <GridItem>
              <CategoryBox>
                {addCategory ? (
                  <CategoryTextFields
                    label={addCategory}
                    value={categoryValue}
                    onChange={setCategoryValue}
                    setAddCategory={setAddCategory}
                  />
                ) : (
                  <SelectCategory
                  categoryIndex={categoryIndex}
                  initCategoryCreation={initCategoryCreation}
                  categories={categories}
                  />
                )}
              </CategoryBox>
            </GridItem>

            <GridItem>
              <TitleTextField
                title={title}
                setTitle={setTitle}
              />
            </GridItem>

            <GridItem>
              <PriceTextField
                setPrice={setPrice}
                changeCurrency={changeCurrency}
                currencies={currencies}
                currencyIndex={currencyIndex}
              />
            </GridItem>

            <GridItem>
              <DateTextField
                setDate={setDate}
                date={date}
              />
            </GridItem>
          </GridContainer>
        </BoxContainer>
      ) : <></>}
    </>
  );
})