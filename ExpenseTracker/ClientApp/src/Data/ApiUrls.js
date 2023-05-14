const baseUrl = "https://localhost:7077/api/"
const apiUrls = {
    getUser : baseUrl + 'Users/get-user',
    getAllUser : baseUrl + 'Users/get-users',
    postUserLogin : baseUrl + 'Users/login',
    getExpenses : baseUrl + 'Expenses?userId=',
    postExpenses : baseUrl + 'Expenses',
    deleteExpense : baseUrl + 'Expenses?expenseId=',
}

export default apiUrls;