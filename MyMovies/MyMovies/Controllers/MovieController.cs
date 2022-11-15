using Microsoft.AspNetCore.Mvc;
using MyMovies.Data;
using MyMovies.Misc;
using MyMovies.Models;
using RestSharp;

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
            obj.Director = movie.Director;
            obj.Type = movie.Type;
            obj.Rate = movie.Rate;
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

        [HttpGet("external")]
        public JsonResult GetExternal()
        {
            var client = new RestClient("https://filmy.programdemo.pl/MyMovies");
            var request = new RestRequest("");

            var response = client.Get(request);

            if (!response.IsSuccessStatusCode)
                return new JsonResult("There is no data to get");

            var processor = new ResultProcessor(context);

            processor.Process(response.Content);

            return new JsonResult("External data processed successfully");
        }

        private readonly ApplicationDbContext context;
    }
}
