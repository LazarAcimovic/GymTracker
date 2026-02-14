using GymTrackerApp.Dtos;
using GymTrackerApp.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GymTrackerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;

        public AuthController(IAuthService authService, IJwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto registerDto)
        {
            var user = await _authService.Register(registerDto);

            if (user == null)
                return BadRequest("Korisnik sa tim email-om već postoji.");

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto loginDto)
        {
            var response = await _jwtService.Authenticate(loginDto);

            if (response == null)
                return Unauthorized("Neispravan email ili lozinka.");

            return Ok(response);
        }
    }
}