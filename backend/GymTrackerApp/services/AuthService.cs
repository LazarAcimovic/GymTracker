using AutoMapper;
using GymTrackerApp.Dtos;
using GymTrackerApp.Handlers;
using GymTrackerApp.Interfaces;
using GymTrackerApp.Models;

namespace GymTrackerApp.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public bool IsDeleted { get; private set; }

        public AuthService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserDto> Register(UserRegisterDto registerDto)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(registerDto.Email);
            if (existingUser != null) return null;

            var user = new User
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserPassword = PasswordHashHandler.HashPassword(registerDto.Password),
                Gender = registerDto.Gender,
                CreatedAt = DateTime.Now,
                IsDeleted = false
            };

            await _userRepository.AddUserAsync(user);
            await _userRepository.SaveChangesAsync();

            return _mapper.Map<UserDto>(user);
        }
    }
}