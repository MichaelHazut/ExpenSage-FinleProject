import '../../../Styles/ExpensesPage.css'

import { Expense } from './Expenses_Compnents/Expense'
import { ExpenseHeaders } from './Expenses_Compnents/ExpenseHeaders'
import { AddExpenseContainer } from './Expenses_Compnents/AddExpenseContainer';
import { useState, useEffect } from 'react';
import { ReadExpense } from '../../../DAL/ExpensesHandler';
import useFetch from '../../../Hooks/useFetch';
import apiUrls from '../../../Data/ApiUrls';

export function ExpensesPage({ loggedUser }) {

  const [expenses, setExpenses] = useState([]);
  const [initAddExpense, setInitAddExpense] = useState(false);
  const [mySort, setMySort] = useState(() => (a, b) => b.price - a.price);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [refreshTriger, setRefreshTriger] = useState([]);
  let { data, isLoading, error } = useFetch(apiUrls.getExpenses + loggedUser.id, {}, triggerFetch);
  //Set initial data
  useEffect(() => {
    if (data == null) {
      setTriggerFetch(true)
    } else {
      setTriggerFetch(false)
    }
  }, [data])

  //Refetching the data on new expense creation
  useEffect(() => {
    setTriggerFetch(true)
  }, [expenses])

  const splicer = (idToDelete) => {
    data = data.filter(expense => expense.id !== idToDelete);
  };
  return (
    <div className="ExpensesPage">

      <h3>My Expenses</h3>

      <div className='expenseOptions'>
        <AddExpenseContainer
          loggedUser={loggedUser}
          initAddExpense={initAddExpense}
          setInitAddExpense={setInitAddExpense}
          SetExpenses={setExpenses}
        />
      </div>

      <div className='expenses-container'>
        <ExpenseHeaders
          setSorting={setMySort}
          currentSort={mySort}
        />
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error + ' | try reloading the page'}</div>
        ) : (
          data &&
          data.sort(mySort).map((expense, index) => (
            <Expense key={expense.title + index} expense={expense} splicer={splicer} />
          ))
        )}
      </div>

    </div>
  )
}