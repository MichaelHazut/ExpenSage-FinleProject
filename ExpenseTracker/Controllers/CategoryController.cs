using DataAccessLayer.Models;
using DataAccessLayer.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseTracker.Controllers
{
    [Route("api/expense-categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        public CategoryController(CategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }
        [HttpGet("CategoryId")]
        public async Task<IActionResult> GetCategory(int categoryId)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(categoryId);
            if(category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpGet("users/{userId}/categories")]
        public async Task<IActionResult> GetCategories(string userId)
        {
            var result = await _categoryRepository.GetCategoryListByIdAsync(userId);
            if(result == null || !result.Any())
            {
                return BadRequest(new { error = "No Categories Found" });
            }

            return Ok(result);
        }

        [HttpPost("expense-category")]
        public async Task<IActionResult> PostCategory(ExpenseCategory category)
        {
            if (category == null)
            {
                return BadRequest("Category Is Empty");
            }

            var resault = await _categoryRepository.CreateAsync(category);
            if (!resault)
            {
                return BadRequest("Error Has Been Accrued");
            }

            return CreatedAtAction(nameof(GetCategory), new { CategoryId = category.Id }, category);
        }
    }
}
