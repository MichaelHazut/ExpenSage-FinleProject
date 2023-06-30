
import { useFetchPost } from '../../../../Hooks/useFetchPost';
import apiUrls from '../../../../Data/ApiUrls';
import { useState, useEffect, useRef } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { CreateExpenseForm } from "./CreateExpenseForm";
import { ToasterSuccess, ToasterWarn } from "../../../Toaster";

export function CreateExpenseContainer({ setTriggerFetch, loggedUser }) {

  const [initAddExpense, setInitAddExpense] = useState(false);

  const { postResponse, postError, postIsLoading, postFetch } = useFetchPost(apiUrls.postExpenses(loggedUser.id));

  const childComponentRef = useRef(null);

  const addExpenseClick = () => {
    setInitAddExpense(!initAddExpense);
  };

  const saveExpenseButton = async () => {
    await childComponentRef.current.saveExpense();
  };

  useEffect(() => {
    if (postResponse) {
      ToasterSuccess("Expense Added Successfully");
      setTriggerFetch(prev => prev + 1);
      setInitAddExpense(!initAddExpense);
    }
  }, [postResponse]);

  useEffect(() => {
    if (postError) {
      ToasterWarn(postError.message);
    }
  }, [postError]);

  return (
    <Box>
      {postIsLoading ? (
        <CircularProgress color='secondary'></CircularProgress>
      ) : (
        !initAddExpense ? (
          <Button
            variant="contained"
            onClick={addExpenseClick}
            sx={{ backgroundColor: '#439346', color: 'white', mb: 1 }}
          >
            Add Expense
          </Button>
        ) : (
          <>
            <Button
              variant="outlined"
              onClick={saveExpenseButton}
              sx={{ backgroundColor: '#439346', color: 'white', mb: 0.5 }}
            >
              Save Expense
            </Button>
            <Button
              variant="danger"
              onClick={() => setInitAddExpense(!initAddExpense)}
              sx={{ backgroundColor: '#EC503A', color: 'white', mb: 0.5 }}
            >
              Cancel
            </Button>
          </>
        )
      )}

      <CreateExpenseForm
        key={initAddExpense ? 'addExpense' : 'other'}
        ref={childComponentRef}
        initAddExpense={initAddExpense}
        loggedUser={loggedUser}
        fetchPostExpense={postFetch}
      />
    </Box>
  );
}





