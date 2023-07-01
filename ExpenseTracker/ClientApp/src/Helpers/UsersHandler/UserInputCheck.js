export function CheckUserInput(email, password, fullName) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    const hasUppercaseLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[^a-zA-Z0-9]/.test(password);
    if(password.length < 8){
        return 'Password must be at least 8 character long';
    }
    
    if(!hasUppercaseLetter || !hasSpecialCharacter){
        return 'Password must cointains 1 Uppercase Letter and symbole';
    }

    if(fullName.length < 2){
        return 'Name must be at least 2 characters';
    }
    return true;
}