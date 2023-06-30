import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Expense } from './Expense_Compnents/Expense';
import { ExpenseHeaders } from './Expense_Compnents/ExpenseHeaders';
import { CreateExpenseContainer } from './Expense_Create/CreateExpenseContainer';
import { useFetchGet } from '../../../Hooks/useFetchGet';
import apiUrls from '../../../Data/ApiUrls';

const ExpensesPage = ({ loggedUser }) => {
  const [expenses, setExpenses] = useState();
  const [triggerFetch, setTriggerFetch] = useState(0);
  const { response, error, isLoading, getFetch } = useFetchGet(apiUrls.getExpenses(loggedUser.id));
  
  useEffect(() => {
    getFetch();
  }, [triggerFetch]);
  
  useEffect(() => {
    if(response){
      setExpenses(response);
    };
  }, [response]);
  

  return (
    <Box className="ExpensesPage" sx={{ p: 4, background: 'linear-gradient(to bottom, #4CAF50, #8BC34A, #C5E1A5, #FFFFFF)', }} >
      <Typography variant="h3" gutterBottom>
        My Expenses
      </Typography>

      <Box className="expenseOptions">
        <CreateExpenseContainer
          loggedUser={loggedUser}
          setTriggerFetch={setTriggerFetch}
        />
      </Box>

      <Box className="expenses-container" sx={{ background: 'white', borderRadius: '8px', p:2, backgroundColor: 'rgba(255, 255, 255, 0.5)', }}>
        <ExpenseHeaders /*setSorting={/*setMySort} currentSort={mySort}*/ />
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress thickness={5} size={60} />
          </Box>) : error ? (
            <Typography>{error + ' | try reloading the page'}</Typography>
          ) : (
            expenses &&
            expenses.map((expense, index) => (
              expense && <Expense key={expense.title + index} expense={expense} />
            ))
        )}
      </Box>
    </Box>
  );
};

export default ExpensesPage;
