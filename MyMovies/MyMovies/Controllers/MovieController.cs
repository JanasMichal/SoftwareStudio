using Microsoft.AspNetCore.Mvc;
using MyMovies.Data;
using MyMovies.Models;

namespace MyMovies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        public MovieController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public JsonResult Get()
        {
            var moviesList = context.Movies;

            return new JsonResult(moviesList);
        }

        [HttpPost]
        public JsonResult Post(Movie movie)
        {
            context.Movies.Add(movie);
            context.SaveChanges();
            return new JsonResult("Movie inserted successfully");
        }

        [HttpPut]
        public JsonResult Put(Movie movie)
        {
            var obj = context.Movies.Single(x => x.Id == movie.Id);

            if(obj == null)
                return new JsonResult("There is no movie to edit");

            obj.Title = movie.Title;
            obj.Type = movie.Type;
            obj.YearOfProduction = movie.YearOfProduction;
            obj.ExternalId = movie.ExternalId;

            context.Movies.Update(obj);
            context.SaveChanges();

            return new JsonResult("Movie updated successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int? id)
        {
            var obj = context.Movies.Find(id);

            if (obj == null)
                return new JsonResult($"There is no movie with id={id}");

            context.Movies.Remove(obj);
            context.SaveChanges();

            return new JsonResult("Movie deleted successfully");
        }

        private readonly ApplicationDbContext context;
    }
}
