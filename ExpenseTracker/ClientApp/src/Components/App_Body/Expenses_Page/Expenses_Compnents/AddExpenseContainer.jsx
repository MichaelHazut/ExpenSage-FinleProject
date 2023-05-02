import '../../../../Styles/AddExpenseButton.css'

import { useState, useEffect } from "react";
import { useRef } from 'react';
import { AddExpenseForm } from './AddExpenseForm';

import Button from 'react-bootstrap/Button';

export function AddExpenseContainer({ initExpense: initAddExpense, setInitExpense: setInitAddExpense, SetNewExpenses }) {

    const childComponentRef = useRef(null);

    const addExpenseClick = () => {
        setInitAddExpense(!initAddExpense);
    };

    const saveExpenseButton = () => {
        //Save To Local Storage
        childComponentRef.current.saveExpense();

        const expenses = JSON.parse(localStorage.getItem('Expenses'));
        SetNewExpenses(expenses);
        setInitAddExpense(!initAddExpense);
    };

    return (
        <>
            {initAddExpense ? (
                <div className='buttons'>
                    <Button variant="secondary" onClick={saveExpenseButton} style={{ marginRight: '6px' }}>
                        Save Expense
                    </Button>
                    <Button variant="danger" onClick={() => setInitAddExpense(!initAddExpense)}>
                        Cancel
                    </Button>
                </div>
            ) : (
                <Button className='buttons' variant="outline-secondary" onClick={addExpenseClick}>
                    Add Expense
                </Button>
            )}

            {initAddExpense ? (
                <AddExpenseForm ref={childComponentRef} />
            ) : null}
        </>
    );
}