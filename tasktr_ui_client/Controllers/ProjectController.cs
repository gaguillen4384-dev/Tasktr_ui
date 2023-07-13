using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using tasktr_ui_client.Domain;

namespace tasktr_ui_client.Controllers
{
    //make sure proxy.config has knowledge of route
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {

        private readonly ILogger<ProjectController> _logger;
        private readonly HttpClient _httpClient;
        //GETTO: Have this ping mockoon and serialize full projects once for mocks.

        public ProjectController(ILogger<ProjectController> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        [HttpGet]
        [Route("all")]
        public async Task<ObjectResult> GetAll()
        {
            var uri = "http://localhost:3002/project/all";//GETTO: Move this to a static string?
            string response = string.Empty;
            try
            {
                response = await _httpClient.GetStringAsync(uri);
            }
            catch 
            {
                return BadRequest("Things, went south reaching backend.");
            }

            return Ok(await ConvertResponseToProjects(response));
        }


        private async Task<List<FullProject>> ConvertResponseToProjects(string response)
        {
            if (string.IsNullOrWhiteSpace(response))
                return new List<FullProject> { };

            var result = JsonConvert.DeserializeObject<List<FullProject>>(response);
            if (result == null || !result.Any())
                return new List<FullProject>();

            return result;
        }
    }
}
