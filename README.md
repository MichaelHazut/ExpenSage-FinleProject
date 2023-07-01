# ExpenSage

ExpenSage is an expense tracking website that allows users to manage their expenses efficiently. It provides a user-friendly interface to input expense details such as category, title, price, and date.

## Technologies Used

- ASP.NET API for the backend development
- React for the frontend development
- Material UI as the design framework
- SQL Server for the database management

## Prerequisites

To run the ExpenSage project locally, you need the following:

- SQL Server installed on your machine
- A code editor to modify the appsettings.json file

## Installation

1. Clone the repository:

```bash
git clone --recurse-submodules https://github.com/MichaelHazut/ExpenSage-FinleProject.git
```

2. Connect Database Locally:
* Navigate to the 'ExpenSage-FinleProject' directory and open the 'ExpenSage.sln' file.
* Open 'appsettings.json' and locate the 'ConnectionStrings' section.
* Replace the '{YoureServerName}' placeholder in the 'DefaultConnection' string with your server name. For example:
```json
"DefaultConnection": "Server={YoureServerName};Database=ExpenSageDB;Trusted_Connection=True;TrustServerCertificate=true;"
```

3. Run Database Migration:
* Open the Package Manager Console and execute the following command:
```powershell
EntityFrameworkCore\Update-Database -Project DataAccessLayer -StartupProject ExpenSage
```

4. Run the Application:
* You can now run the application locally. It will be available at 'https://localhost:44435/'.

# Usage
1. Once the application is running, open a web browser and navigate to 'https://localhost:44435/'.
2. Home Page: When you first open the website, you will be directed to the Home Page. Here, you'll find a prominent button labeled "Start Tracking Now." Clicking this button will lead you to the Sign Up page. Alternatively, you can choose the Sign In option from the navigation bar at the top.

2. Sign Up and Sign In: To create an account, navigate to the Sign Up page and provide the required information. If you already have an account, click the Sign In option from the navigation bar. Enter your credentials to log in to your existing account.

3. My Expenses Page: Upon successful sign-up or login, you will be directed to the "My Expenses" page. This page serves as the hub for managing your expenses.

4. Add Expense: On the "My Expenses" page, you'll find a button labeled "Add Expense." Clicking this button will reveal a form where you can input the details of your expense. You have the option to select a category from the available options or add a new category. Additionally, enter the expense title, price, and date.

5. View Expenses: After filling in all the necessary information, click the submit button. Your expense will now appear in the expense section below the form. Here, you can view all your recorded expenses.

By following these steps, you can easily track and manage your expenses using ExpenSage. Enjoy the convenience of organized expense tracking and gain better control over your financial management.