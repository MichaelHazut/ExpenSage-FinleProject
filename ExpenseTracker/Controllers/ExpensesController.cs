using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Dal;
using ExpenseTracker.Models;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext _context;

        public ExpensesController(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Expense>>> GetExpenses(int userId)
        {
            if (_context.Expenses == null || userId == 0)
            {
                return NotFound();
            }
            var expenses = await _context.Expenses.Where(e => e.UserId == userId).ToListAsync();
            return expenses;
        }


        [HttpPost]
        public async Task<ActionResult> PostExpense(Expense expense)
        {
            //Get a referance to the user for DB
            var user = await _context.Users.FindAsync(expense.UserId);

            if (_context.Expenses == null)
            {
                return Problem("Entity set 'ExpenseTrackerDbContext.Expenses'  is null.");
            }

            if (expense == null)
            {
                return BadRequest("Expense cannot be null");
            }

            expense.User = user; 

            _context.Expenses.Add(expense); 

            await _context.SaveChangesAsync();

            //Serialize json to prevent circular references
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };

            var json = JsonSerializer.Serialize(new { success = true, expense }, options);
            return Ok(json);
        }

        // PUT: api/Expenses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(int id, Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteExpense(int expenseId)
        {
            if (_context.Expenses == null)
            {
                return NotFound();
            }
            var expense = await _context.Expenses.FindAsync(expenseId);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return Ok("Expense Deleted");
        }

        private bool ExpenseExists(int id)
        {
            return (_context.Expenses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
