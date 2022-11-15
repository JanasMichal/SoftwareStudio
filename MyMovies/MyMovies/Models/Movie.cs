using System.ComponentModel.DataAnnotations;

namespace MyMovies.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Director { get; set; }
        public int? YearOfProduction { get; set; }
        public string? Type { get; set; }
        public double Rate { get; set; }
        public int? ExternalId { get; set; }
    }
}
