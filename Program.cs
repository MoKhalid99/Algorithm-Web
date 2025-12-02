using Microsoft.EntityFrameworkCore;
using Algorithm_Web.Server.Data; 
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

// اعداد Database
var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<algorithm_webDbContext>(options =>
	options.UseSqlServer(connectionString));

// إعداد CORS 
builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(policy =>
	{
		//  localhost:5173 لازم يحفظ 
		policy.WithOrigins("http://localhost:5173")
			  .AllowAnyHeader()
			  .AllowAnyMethod();
	});
});
// اعدادJSON Token
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidateLifetime = true,
			ValidateIssuerSigningKey = true,
			// قراءة الإعدادات من appsettings.json
			ValidIssuer = builder.Configuration["Jwt:Issuer"],
			ValidAudience = builder.Configuration["Jwt:Audience"],
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
		};
	});
//خدمات المتحكمات والتشغيل الأساسية
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

//  (Middleware Pipeline)
app.UseHttpsRedirection(); //لاتصال على HTTPS

// تفعيل CORS هنا
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();