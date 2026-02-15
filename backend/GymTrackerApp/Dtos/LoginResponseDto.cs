namespace GymTrackerApp.Dtos
{
    public class LoginResponseDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string AccessToken { get; set; }
        public int ExpiresIn { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Gender { get; set; }

    }
}
