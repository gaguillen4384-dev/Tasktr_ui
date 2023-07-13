namespace tasktr_ui_client
{
    public class Project
    {
        public string Name { get; set; } = string.Empty;

        public string Acronym { get; set; } = string.Empty;

        public ProjectStats ProjectStats { get; set; } = new ProjectStats();
    }
}
