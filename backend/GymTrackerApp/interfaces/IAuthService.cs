using GymTrackerApp.Dtos;

namespace GymTrackerApp.Interfaces
{
    public interface IAuthService
    {
        Task<UserDto> Register(UserRegisterDto registerDto);
    }
}
