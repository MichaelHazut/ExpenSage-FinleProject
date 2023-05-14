import '../../../../Styles/AddExpense.css'

import { useImperativeHandle, useRef, useState, useEffect } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import React from 'react';

import { CreateExpense } from '../../../../DAL/ExpensesHandler';
import { ToasterSuccess } from '../../../Toaster'
import Expense from '../../../../Models/ExpenseModel';
import { useCreation } from '../../../../DAL/ExpensesHandler';
import apiUrls from '../../../../Data/ApiUrls';
import usePostFetch from '../../../../Hooks/usePostFetch';

export const AddExpenseForm = React.forwardRef(({ loggedUser, setExpenseData }, ref) => {
    
    var title = useRef();
    var price = useRef();
    var date = useRef();
    var category = useRef();

    const [currencyIndex, setCurrencyIndex] = useState(0);
    const [addCategory, setAddCategory] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [categories, setCategories] = useState((
        localStorage.getItem('Categories')
        || 'Category,Groceries,Rent,Bills,Add New').split(',')
    );

    const currencies = ['$', '₪']


    const handleExpenseSubmit = (e) => {
        var currentCategory = '';
        if (addCategory == true) {
            const newCategories = createNewCategory();
            setCategories(_ => [...newCategories]);
            currentCategory = newCategories[newCategories.length - 2];
        } else {
            currentCategory = categories[categoryIndex]
        }
        const expenseProps = {
            user: loggedUser,
            category: currentCategory,
            title: title.current.value,
            currency: currencies[currencyIndex],
            price: price.current.value,
            date: date.current.value
        }
        const expense = new Expense(expenseProps);
        setExpenseData(expense.state)
        return expense.state;
    }
      

    useImperativeHandle(ref, () => ({
        saveExpense: handleExpenseSubmit,
    }));

    const changeCurrency = () => {
        currencyIndex >= currencies.length - 1 ?
            setCurrencyIndex(0) :
            setCurrencyIndex(currencyIndex + 1);
    }

    const initCategoryCreation = (e) => {
        if (e.target.value == categories.length - 1) {
            setAddCategory(!addCategory);
            return;
        }
        setCategoryIndex(e.target.value)
    }

    const createNewCategory = () => {
        const index = categories.length > 0 ? categories.length - 1 : 0;
        const newCategories = [...categories.slice(0, index), category.current.value, ...categories.slice(index)];
        localStorage.setItem('Categories', newCategories)
        return newCategories
    }

    return (
        <div >
            <Container id='addExpenseContainer' >
                <Form className="grid-container">
                    <Form.Group className="expenseGroup" controlid='formTitle'>
                        {addCategory ? (
                            <Form.Control ref={category} type='text' placeholder='Add Category'></Form.Control>
                        ) : (
                            <Form.Select id='formSelect' onChange={initCategoryCreation} >
                                {categories.map((category, i) =>
                                    (<option value={i} key={category + i}>{category}</option>))}
                            </Form.Select>
                        )}
                    </Form.Group>
                    <Form.Group className="expenseGroup" controlid='formTitle'>
                        <Form.Control ref={title} type='text' placeholder='Title'></Form.Control>
                    </Form.Group>

                    <InputGroup className="expenseGroup" controlid='formPrice'>
                        <InputGroup.Text onClick={changeCurrency}>{currencies[currencyIndex]}</InputGroup.Text>
                        <Form.Control ref={price} type='text' placeholder='Price'></Form.Control>
                    </InputGroup>

                    <Form.Group className="expenseGroup" controlid='formDate'>
                        <Form.Control ref={date} type='date' placeholder='Date'></Form.Control>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
})
