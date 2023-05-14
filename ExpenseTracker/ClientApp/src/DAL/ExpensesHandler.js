import usePostFetch from "../Hooks/usePostFetch";
import apiUrls from "../Data/ApiUrls";
import { useEffect } from "react";

  

export function ReadExpense(setExpenses) {
    setExpenses(JSON.parse(localStorage.getItem('Expenses')));
}