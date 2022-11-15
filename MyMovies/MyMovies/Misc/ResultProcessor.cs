using MyMovies.Data;
using MyMovies.Models;
using Newtonsoft.Json;

namespace MyMovies.Misc
{
    public class ResultProcessor
    {
        public ResultProcessor(ApplicationDbContext context)
        {
            this.context = context;
        }

        public void Process(string result)
        {
            var parseResult = Parse(result);

            foreach(var movie in parseResult)
            {
                context.Movies.Add(movie);
            }

            context.SaveChanges();
        }

        private IEnumerable<Movie> Parse(string result)
        {
            var items = JsonConvert.DeserializeObject<ExternalContract[]>(result);

            if (items.Length == 0 || items == null)
                throw new ArgumentNullException("There is no items in given data.");

            List<Movie> moviesToAdd = new List<Movie>();

            var existingMovies = context.Movies;

            foreach (var item in items)
            {
                if (existingMovies.Any(x => x.ExternalId == item.Id))
                    continue;

                var movie = new Movie();
                movie.Title = item.Title;
                movie.Director = item.Director;
                movie.YearOfProduction = item.Year;
                movie.Rate = item.Rate;
                movie.ExternalId = item.Id;

                moviesToAdd.Add(movie);
            }

            return moviesToAdd;
        }
        private readonly ApplicationDbContext context;
    }
}
