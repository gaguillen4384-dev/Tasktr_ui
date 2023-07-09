using Microsoft.AspNetCore.Mvc;

namespace tasktr_ui_client.Controllers
{
    //make sure proxy.config has knowledge of route
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {

        private readonly ILogger<ProjectController> _logger;

        public ProjectController(ILogger<ProjectController> logger)
        {
            _logger = logger;
        }

        
        [HttpGet]
        public IEnumerable<Project> Get()
        {
            List<Project> projects = new List<Project>();
            foreach(var i in Enumerable.Range(1, 5))
            {
                var projectNumber = Random.Shared.Next(1, 7);
                projects.Add(new Project() 
                {
                    Name = $"Project_{projectNumber}",
                    Acronym = $"PRJ_{projectNumber}",
                    NumberOfStories = Random.Shared.Next(1, 7)
                });
            }

            return projects;
        }

        [HttpGet]
        [Route("{projectAcronym}")]
        public IEnumerable<Stories> GetStories(string projectAcronym)
        {
            List<Stories> stories = new List<Stories>();
            foreach (var i in Enumerable.Range(1, 5))
            {
                var storyNumber = Random.Shared.Next(1, 7);
                stories.Add(new Stories()
                {
                    Name = $"Story_{storyNumber}",
                    ProjectAcronym = projectAcronym,
                    SubTasks = MakeSubtasks(),
                    Completed = i != 5 ? false : true,
                    Task = new TaskCheck($"task_{i}", false)
                });
            }

            return stories;
        }

        private List<TaskCheck> MakeSubtasks() 
        {
            List<TaskCheck> subtasks = new List<TaskCheck> ();

            var storyNumber = Random.Shared.Next(1, 5);
            foreach (var i in Enumerable.Range(1, 5)) 
            {
                if( i != storyNumber)
                    subtasks.Add(new TaskCheck($"subtask_{i}", false));
                else
                    subtasks.Add(new TaskCheck($"subtask_{i}", true));
            }

            return subtasks;
        }
    }
}
