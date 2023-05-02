import { useState } from 'react';
import useFetch from '../Hooks/useFetch';

class User {
    constructor(props) {
        this.state = {
            name: props.name,
            email: props.email,
            password: props.password,
        }
    }

    addExpense(expense) {
        this.state.expenses.push(expense);
        console.log(this.state.expenses);
    }
}



export default User;