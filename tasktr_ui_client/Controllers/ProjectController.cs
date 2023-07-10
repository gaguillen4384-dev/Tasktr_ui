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
        //GETTO: Have this ping mockoon and serialize full projects once for mocks.

        public ProjectController(ILogger<ProjectController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("all")]
        public IEnumerable<FullProject> GetAll()
        {
            var projects = CreateProjects();
            var stories = CreateStoriesForProjects(projects);

            return CreateFullProjects(projects, stories); ;
        }


        [HttpGet]
        public IEnumerable<Project> Get()
        {
            return CreateProjects();
        }

        [HttpGet]
        [Route("{projectAcronym}")]
        public List<Story> GetStories(string projectAcronym)
        {
            List<Story> stories = new List<Story>();
            foreach (var i in Enumerable.Range(1, 5))
            {
                var storyNumber = Random.Shared.Next(1, 7);
                stories.Add(new Story()
                {
                    Name = $"Story_{storyNumber}",
                    ProjectAcronym = projectAcronym,
                    Subtasks = MakeSubtasks(),
                    Completed = i != 5 ? false : true,
                    Task = new TaskCheck($"task_{i}", false)
                });
            }


            return stories;
        }

        private List<Project> CreateProjects() 
        {
            List<Project> projects = new List<Project>();
            foreach (var i in Enumerable.Range(1, 5))
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

        private List<Story> CreateStoriesForProjects(List<Project> projects) 
        {
            List<Story> stories = new List<Story>();
            var i = 0;
            foreach (var project in projects)
            {
                var storyNumber = Random.Shared.Next(1, 7);
                stories.Add(new Story()
                {
                    Name = $"Story_{storyNumber}",
                    ProjectAcronym = project.Acronym,
                    Subtasks = MakeSubtasks(),
                    Completed = i != 4 ? false : true,
                    Task = new TaskCheck($"task_{i}", false)
                });
                i ++;
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

        private List<FullProject> CreateFullProjects(List<Project> projects, List<Story> stories ) 
        {
            var fullprojects = new List<FullProject>();

            foreach ( var project in projects) 
            {
                var projectStories = stories.FindAll(story => story.ProjectAcronym == project.Acronym);

                fullprojects.Add(new FullProject() { 
                    Id = project.Acronym,
                    Project = project,
                    Stories = projectStories
                });
            }

            return fullprojects;
        }
    }
}
