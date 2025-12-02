namespace Algorithm_Web.Server.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Name { get; set; } // يستخدم في Register
		public string Email { get; set; } // يستخدم في Registerو Login
		public byte[] PasswordHash { get; set; } // لتخزين كلمة المرور مشفرة
		public byte[] PasswordSalt { get; set; } // لتشفير كلمة المرور
												 //   لاضافة الوزيد من هنا
	}
}
