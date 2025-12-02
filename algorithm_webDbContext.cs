using Algorithm_Web.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace Algorithm_Web.Server.Data
{
	public class algorithm_webDbContext : DbContext
	{
		public algorithm_webDbContext(DbContextOptions<algorithm_webDbContext> options)
		: base(options)
		{
		}

		public DbSet<User> Users { get; set; } // جدول المستخدمين
	}
}
