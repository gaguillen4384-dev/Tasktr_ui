namespace tasktr_ui_client
{
    public class TaskCheck
    {
        public string TaskAction { get; set; } = string.Empty;

        public bool Completed { get; set; } = false;

        public TaskCheck(string taskAction, bool completed)
        {
            TaskAction = taskAction;
            Completed = completed;
        }

        public TaskCheck() { }
    }
}
