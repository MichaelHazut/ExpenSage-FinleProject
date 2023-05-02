const home = { name: 'Home'};
const myExpenses = { name: 'My Expenses'};
const login = { name: 'Login'};
const logout = { name: 'Logout'};
const signUp = { name: 'Sign Up'};
const about = { name: 'About'};

//need to remove after done testing
const test_Page = {name: 'Test Page'}

export const urlRouter = [home, about, login, logout, signUp, test_Page]
export const loggedIn = [home, myExpenses, about, logout, test_Page]
export const notLoggedIn = [home,  login, signUp, about, test_Page]