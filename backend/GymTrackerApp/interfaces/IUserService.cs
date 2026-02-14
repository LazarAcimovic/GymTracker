using GymTrackerApp.Dtos;

namespace GymTrackerApp.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(int id);
        Task<UserDto> GetUserByEmailAsync(string email);
    }
}
