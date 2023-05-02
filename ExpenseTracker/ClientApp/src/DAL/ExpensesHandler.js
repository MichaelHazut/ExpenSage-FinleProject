export function CreateExpense(userId, title, price, currency, date, category) {
    const existingExpenses = JSON.parse(localStorage.getItem('Expenses')) || [];

    const newExpense = {
        userId: userId,
        expenseId: existingExpenses.length + 1,
        title: title,
        price: price,
        currency: currency,
        date: date,
        category: category
    }

    existingExpenses.push(newExpense);
    localStorage.setItem('Expenses', JSON.stringify(existingExpenses))
    console.log(newExpense);
}

export function ReadExpense(setExpenses) {
    setExpenses(JSON.parse(localStorage.getItem('Expenses')));
}