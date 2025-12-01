namespace Algorithm_Web.Server.Models
{
	public class RegisterModel
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string ConfirmPassword { get; set; } //علشان يتم التأكيد

	}
}

