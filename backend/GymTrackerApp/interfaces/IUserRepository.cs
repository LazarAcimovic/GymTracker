using GymTrackerApp.Models;

namespace GymTrackerApp.interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
        Task<User> GetUserByEmailAsync(string email);
        Task AddUserAsync(User user);
        Task<bool> SaveChangesAsync();
    }
}
