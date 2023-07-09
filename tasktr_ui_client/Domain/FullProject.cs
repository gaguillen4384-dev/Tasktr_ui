namespace tasktr_ui_client.Domain
{
    public class FullProject
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public Project Project { get; set; } = new Project();

        public IEnumerable<Story> Stories { get; set; } = new List<Story>();
    }
}
