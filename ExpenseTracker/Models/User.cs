using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ExpenseTracker.Models
{
    public class User
    {

        [Required]
        [EmailAddress]
        [Index("IX_Email", IsUnique = true)]
        public string? Email { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 6)] 
        public string? Password { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string? Name{ get; set; }

        public int Id { get; set; }
        public ICollection<Expense>? Expenses{ get; set; } = new List<Expense>();

        public bool IsStayLoggedIn { get; set; }

        public User()
        {
        }

        public User(string email, string password, string name)
        {
            this.Email = email;
            this.Password = password;
            this.Name = name;
        }
    }
}
