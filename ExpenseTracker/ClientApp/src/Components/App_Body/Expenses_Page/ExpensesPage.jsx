import '../../../Styles/ExpensesPage.css'

import { Expense } from './Expenses_Compnents/Expense'
import { ExpenseNav } from './Expenses_Compnents/ExpenseNav'
import { AddExpenseContainer } from './Expenses_Compnents/AddExpenseContainer';
import { useState, useEffect } from 'react';
import { ReadExpense } from '../../../DAL/ExpensesHandler';

export function ExpensesPage({ loggedUser }) {

  const [expenses, setExpenses] = useState([]);
  const [initAddExpense, setInitAddExpense] = useState(false);
  const [mySort, setMySort] = useState(() => (a, b) => b.price - a.price);
  console.log(loggedUser);
  useEffect(() => {
    ReadExpense(setExpenses)
  }, []);
  return (
    <div className="ExpensesPage">
      <h3>My Expenses</h3>
      <div className='expenseOptions'>
        <AddExpenseContainer initExpense={initAddExpense} setInitExpense={setInitAddExpense} SetNewExpenses={setExpenses} />
      </div>

      <div className='expenses-container'>
        <ExpenseNav setSorting={setMySort} currentSort={mySort} />
        { expenses && expenses.sort(mySort).map((expense) => (
          <Expense key={expense.expenseId} expense={expense} />))}
      </div>
    </div>
  )
}

