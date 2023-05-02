using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Models
{
    public class Expense
    { 
        public int Id { get; set; }
        public int UserId { get; set; }

        [Required]
        public User? User { get; set; }
        public string? Title { get; set; }
        public int Price { get; set; }
        public DateTime? Date { get; set; }
        public string? Currecny { get; set; }
        public string? Category { get; set; }

        public Expense()
        {
        }
        public Expense(User user, string? title, int price, DateTime? date)
        {
            User = user;
            UserId = user.Id;
            Title = title;
            Price = price;
            Date = date;
        }
    }
}
