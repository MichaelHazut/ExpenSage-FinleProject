using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;


namespace ExpenseTracker.Dal
{
    public class ExpenseTrackerDbContext : DbContext
    {
        public ExpenseTrackerDbContext
            (DbContextOptions<ExpenseTrackerDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Expense>()
            .HasOne(e => e.User)
            .WithMany(u => u.Expenses)
            .HasForeignKey(e => e.UserId);



        }
    }
}
