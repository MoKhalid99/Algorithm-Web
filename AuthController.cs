using Algorithm_Web.Server.Data;
using Algorithm_Web.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Algorithm_Web.Server.Controllers
{
	[ApiController]
	[Route("api/v1/auth")] // المسار 
	public class AuthController : ControllerBase
	{
		private readonly algorithm_webDbContext _context;
		private readonly IConfiguration _configuration;

		public AuthController(algorithm_webDbContext context, IConfiguration configuration)
		{
			_context = context;
			_configuration = configuration;
		}

		[HttpPost("signup")]
		public async Task<IActionResult> Register([FromBody] RegisterModel model)
		{
			if (await _context.Users.AnyAsync(u => u.Email == model.Email))
			{
				return BadRequest(new { message = "Email already exists" });
			}

			CreatePasswordHash(model.Password, out byte[] passwordHash, out byte[] passwordSalt);

			var user = new User
			{
				Name = model.Name,
				Email = model.Email,
				PasswordHash = passwordHash,
				PasswordSalt = passwordSalt
			};

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Registration successful!" });
		}

		[HttpPost("signin")]
		public async Task<IActionResult> SignIn([FromBody] LoginModel model)
		{
			var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);

			if (user == null || !VerifyPasswordHash(model.Password, user.PasswordHash, user.PasswordSalt))
			{
				// يفضل أن تكون رسالة عامة لأسباب أمنية
				return Unauthorized(new { message = "Invalid email or password" });
			}

			var token = CreateToken(user);

			return Ok(new
			{
				message = "success", // يتوافق مع ما يتوقعه Login.jsx
				token = token        // التوكن الذي سيتم تخزينه في React
			});
		}

		// دوال مساعدة لإنشاء التشفير والتحقق منه (يجب أن تكون في خدمة منفصلة في تطبيق حقيقي)
		private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (var hmac = new System.Security.Cryptography.HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}

		private bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
		{
			using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				for (int i = 0; i < computedHash.Length; i++)
				{
					if (computedHash[i] != storedHash[i]) return false;
				}
				return true;
			}
		}

		private string CreateToken(User user)
		{
			List<Claim> claims = new List<Claim>
		{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim(ClaimTypes.Email, user.Email)
		};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.Now.AddDays(1),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
