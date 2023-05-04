using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTracker.Dal;
using ExpenseTracker.Models;
using System.Security.Cryptography;
using Microsoft.Build.Execution;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ExpenseTrackerDbContext _context;

        public UsersController(ExpenseTrackerDbContext context)
        {
            _context = context;
        }

        //Return A List Of All Users From The Database
        [HttpGet("get-users")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            if (_context.Users == null)
            {
                return new List<User> { new User("Michael1mic1@gmail.com", "!Aa123456", "Michael Hazut") };
            }
            return await _context.Users.ToListAsync();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(LoginModel model)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (user == null)
            {
                return BadRequest(new { success = false, message = "User not found" });
            }

            if (user.Password != model.Password)
            {
                return BadRequest(new { success = false, message = "Invalid password." });
            }
            return Ok(new { success = true, user});
        }


        // POST: api/Users
        [HttpPost()]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'ExpenseTrackerDbContext.Users'  is null.");
            }

            //Check If Email Already Exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already exists.");
            }
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
