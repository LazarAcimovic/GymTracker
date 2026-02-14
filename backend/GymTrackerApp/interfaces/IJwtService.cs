using GymTrackerApp.Dtos;

namespace GymTrackerApp.Interfaces
{
    public interface IJwtService
    {
        Task<LoginResponseDto> Authenticate(LoginRequestDto request);
    }
}
