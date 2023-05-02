import '../../../../Styles/AddExpense.css'

import { useImperativeHandle, useRef, useState } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import React from 'react';

import { CreateExpense } from '../../../../DAL/ExpensesHandler';
import { ToasterSuccess } from '../../../Toaster'

export const AddExpenseForm = React.forwardRef(({ state }, ref) => {
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
    const saveExpense = () => {
        //Get Current Expenses from local storage
        var currentCategory = '';
        if (addCategory == true) {
            const newCategories = createNewCategory();
            setCategories(prevCategories => [...newCategories]);
            currentCategory = newCategories[newCategories.length - 2];
        } else {
            currentCategory = categories[categoryIndex]
        }
        CreateExpense(
            "1", //Temperal User Id
            title.current.value,
            price.current.value,
            currencies[currencyIndex],
            date.current.value,
            currentCategory
        );
        ToasterSuccess('Expense Added Successfully!');
    };

    useImperativeHandle(ref, () => ({
        saveExpense: saveExpense,
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
                    <Form.Group className="expenseGroup" controlId='formTitle'>
                        {addCategory ? (
                            <Form.Control ref={category} type='text' placeholder='Add Category'></Form.Control>
                        ) : (
                            <Form.Select id='formSelect' onChange={initCategoryCreation} >
                                {categories.map((category, i) =>
                                    (<option value={i}>{category}</option>))}
                            </Form.Select>
                        )}
                    </Form.Group>
                    <Form.Group className="expenseGroup" controlId='formTitle'>
                        <Form.Control ref={title} type='text' placeholder='Title'></Form.Control>
                    </Form.Group>

                    <InputGroup className="expenseGroup" controlId='formPrice'>
                        <InputGroup.Text onClick={changeCurrency}>{currencies[currencyIndex]}</InputGroup.Text>
                        <Form.Control ref={price} type='text' placeholder='Price'></Form.Control>
                    </InputGroup>

                    <Form.Group className="expenseGroup" controlId='formDate'>
                        <Form.Control ref={date} type='text' placeholder='Date'></Form.Control>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
})
