using DataAccessLayer.Models;
using DataAccessLayer.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpenseRepository _expenseRepository;
        private readonly UserRepository _userRepository;
        public ExpensesController(ExpenseRepository expenseRepository, UserRepository userRepository)
        {
            _expenseRepository = expenseRepository;
            _userRepository = userRepository;
        }



        [HttpGet("expenses/{UserId}")]
        public async Task<IActionResult> GetExpense(int expenseId)
        {
            var expense = await _expenseRepository.GetExpenseByIdAsync(expenseId);
            if(expense == null)
            {
                return NotFound();
            }

            return Ok(expense);
        }

        [HttpGet("users/{userId}/expenses")]
        public async Task<IActionResult> GetExpensesList(string userId)
        {
            var expenses = await _expenseRepository.GetExpenseByUserId(userId);
            if(expenses == null)
            {
                
                return NotFound(new { error = "No Expenses Found" });
            }
            return Ok(expenses);
        }

        [HttpPost("users/{userId}/expenses")]
        public async Task<IActionResult> PostExpense([FromBody] Expense expense)
        {
            if(expense == null)
            {
                return BadRequest(new { error = "Expense Is Empty" });
            }

            var user = await _userRepository.GetUserByIdAsync(expense.UserId);

            if (user == null)
            {
                return NotFound(new { error = "User Not Found" });
            }

            expense.User = user;

            var response = await _expenseRepository.CreateExpenseAsync(expense);

            if (!response)
            {
                return BadRequest(new { error = "Error Has Been Accrued" });
            }

            var newExpense = new ExpenseDTO(expense);

            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                WriteIndented = true
            };

            var serializedExpense = JsonSerializer.Serialize(expense, options);
            return CreatedAtAction(nameof(GetExpense), new { expenseId = expense.Id }, newExpense);

        }

        [HttpPut("users/{userId}/expenses/{expenseId}")]
        public async Task<IActionResult> UpdateExpense(int id, [FromBody] Expense updatedExpense)
        {
            if (updatedExpense == null || id != updatedExpense.Id)
            {
                return BadRequest("New Expense Dose Not Exist");
            }

            var response = await _expenseRepository.UpdateExpenseAsync(id, updatedExpense);
            
            if (!response)
            {
                return BadRequest("Error Has Been Accrued");
            }

            return NoContent();
        }

        [HttpDelete("users/{userId}/expenses/{expenseId}")]
        public async Task<IActionResult> DeleteExpense(int expenseId)
        {
            var response = await _expenseRepository.DeleteExpenseAsync(expenseId);
            
            if (!response)
            {
                return BadRequest("Error Has Been Accrued");
            }

            return NoContent();
        }
    }
}

