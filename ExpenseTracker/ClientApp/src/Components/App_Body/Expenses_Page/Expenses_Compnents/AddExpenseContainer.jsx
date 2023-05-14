import '../../../../Styles/AddExpenseButton.css'
import Button from 'react-bootstrap/Button';

import { useState, useEffect } from "react";
import { useRef } from 'react';
import { AddExpenseForm } from './AddExpenseForm';
import apiUrls from '../../../../Data/ApiUrls';
import usePostFetch from '../../../../Hooks/usePostFetch';

export function AddExpenseContainer({initAddExpense, setInitAddExpense, SetExpenses, loggedUser }) {

    const [expenseData, setExpenseData] = useState(null);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const { data, error, isLoading } = usePostFetch(apiUrls.postExpenses, expenseData, triggerFetch);
    const childComponentRef = useRef(null);

    const addExpenseClick = () => {
        setInitAddExpense(!initAddExpense);
    };

    const saveExpenseButton = () => {
        var newExpenses = childComponentRef.current.saveExpense();

        SetExpenses(newExpenses);
        setInitAddExpense(!initAddExpense);
    };

    useEffect(() => {
        if (expenseData === null) return;
        setTriggerFetch(true);
    }, [expenseData]);
    
    useEffect(() => {
        setTriggerFetch(false);
    }, [data]);

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
                <AddExpenseForm ref={childComponentRef} loggedUser={loggedUser} setExpenseData={setExpenseData} />
            ) : null}
        </>
    );
}