using AutoMapper;
using GymTrackerApp.Dtos;
using GymTrackerApp.Models;

namespace GymTrackerApp.Profiles
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<UserRegisterDto, User>()
                .ForMember(dest => dest.UserPassword, opt => opt.MapFrom(src => src.Password));

            CreateMap<User, UserDto>();

            CreateMap<WorkoutCreateDto, Workout>();

            CreateMap<Workout, WorkoutDto>()
                .ForMember(dest => dest.ExerciseTypeName,
                           opt => opt.MapFrom(src => src.ExerciseType.Name));
        }
    }
}
