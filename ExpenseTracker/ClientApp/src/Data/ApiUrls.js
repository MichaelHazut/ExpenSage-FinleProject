const baseUrl = "https://localhost:7077/api/"
const apiUrls = {
    getUser : baseUrl + 'Users/get-user',
    getAllUser : baseUrl + 'Users/get-users',
    registerUser : baseUrl + 'Users/register',
    postUserLogin : baseUrl + 'Users/login',
    getExpenses: (userId) => baseUrl + `expenses/users/${userId}/expenses`,
    postExpenses: (userId) => baseUrl + `expenses/users/${userId}/expenses`,
    deleteExpense : baseUrl + 'Expenses?expenseId=',
    getCategories : (userId) => baseUrl + `expense-categories/users/${userId}/categories`,
    postCategory : baseUrl + 'expense-categories/expense-category'
}

export default apiUrls;