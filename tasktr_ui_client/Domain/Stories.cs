namespace tasktr_ui_client
{
    public class Stories
    {
        public string Name { get; set; } = string.Empty;

        public string ProjectAcronym { get; set; } = string.Empty;

        public TaskCheck Task { get; set; } = new TaskCheck();

        public List<TaskCheck> SubTasks = new List<TaskCheck>();

        public bool Completed = false;
    }
}

//name: string;
//projectAcronym: string;
//task: [string, boolean];
//subtasks: [string, boolean][] ;
//completed: boolean;