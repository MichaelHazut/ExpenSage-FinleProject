export function checkIfUserExist(email) {
    const allUsersArr = JSON.parse(localStorage.getItem("Users")) || [];
    return allUsersArr.some(user => user.email === email);
}