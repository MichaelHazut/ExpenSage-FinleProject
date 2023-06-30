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
    }
}



export default User;