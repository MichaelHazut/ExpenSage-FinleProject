using DataAccessLayer.Models;
using DataAccessLayer.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using DataAccessLayer.Enums;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public UsersController(UserRepository userRepository, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Return the user or appropriate response
            return Ok(user);
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister user)
        {
            User newUser = new User(user);

            var result = await _userManager.CreateAsync(newUser, user.Password);
            if (result.Succeeded)
            {
                UserDTO userDTO = new UserDTO
                {
                    Id = newUser.Id,
                    Name = newUser.Name,
                    Email = newUser.NormalizedEmail!,
                    AuthenticationLevel = newUser.AuthenticationLevel
                };
                return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, userDTO);
            }
            else
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }
        }
        
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin loginInfo)
        {
            string email = loginInfo.Email.ToUpperInvariant();
            User? user = await _userManager.FindByNameAsync(email);

            if(user == null)
            {
                return NotFound(new { error = "User Not Found" });

            }

            SignInResult result = await _signInManager.PasswordSignInAsync(user, loginInfo.Password, true, false); 

            if (!result.Succeeded)
            {
                return Unauthorized(new { error = "Invalid email or password" });
            }

            var userReturn = new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.NormalizedEmail!,
                AuthenticationLevel = user.AuthenticationLevel
            };

            return Ok(userReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] User updatedUser)
        {
            if(updatedUser == null || updatedUser.Id != id) 
            {
                return BadRequest("Updated User Dose Not Exist");
            }
            
            var response = await _userRepository.UpdateUserAsync(id, updatedUser);
            if(!response) 
            {
                return BadRequest("Error Has Been Accrued");
            }

            return NoContent();
        }

        [HttpPut("{id}/changepassword")]
        public async Task<IActionResult> ChangePassword(string userId, [FromBody] ChangePasswordModel model)
        {
            if (model == null || model.UserId != userId || string.IsNullOrEmpty(model.OldPassword) || string.IsNullOrEmpty(model.NewPassword))
            {
                return BadRequest("Invalid change password request");
            }
            
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            if(!changePasswordResult.Succeeded) 
            {
                return BadRequest("Failed to change password");
            }
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            
            if (user == null)
            {
                return NotFound("User not found");
            }
            
            var result = await _userManager.DeleteAsync(user);
            
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors.Select(e => e.Description));
            }
            return NoContent();
        }
    }
    
}
