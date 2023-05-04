using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.Models
{
    public class Expense
    { 
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        public User? User { get; set; }
        public string? Title { get; set; }
        public int Price { get; set; }
        public DateTime Date { get; set; }
        public string? Currency { get; set; }
        public string? Category { get; set; }

        public Expense()
        {
        }
        public Expense(int userId, string category, string? title, int price, DateTime date, string currency)
        {
            UserId = userId;
            Category = category;
            Title = title;
            Currency = currency;
            Price = price;
            Date = date;
        }
    }
}
