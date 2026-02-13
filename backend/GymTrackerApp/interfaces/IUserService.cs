using GymTrackerApp.Dtos;

namespace GymTrackerApp.interfaces
{
    public interface IUserService
    {
        Task<UserDto> GetUserByIdAsync(int id);
        Task<UserDto> GetUserByEmailAsync(string email);
    }
}
