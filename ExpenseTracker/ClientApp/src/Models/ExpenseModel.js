class Expense{
    constructor(props){
        this.state = {
            user: props.user,
            userId: props.user.id,
            expenseCategory: { name :props.expenseCategory.name },
            expenseCategoryId: props.expenseCategory.id,
            title: props.title ,
            currency: props.currency ,
            price: props.price ,
            date: new Date(props.date) || new Date()
        }
    }
}

export default Expense