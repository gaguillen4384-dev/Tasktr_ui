﻿namespace tasktr_ui_client
{
    public class Story
    {
        public string Name { get; set; } = string.Empty;

        public string ProjectAcronym { get; set; } = string.Empty;

        public TaskCheck Task { get; set; } = new TaskCheck();

        public List<TaskCheck> Subtasks { get; set; } = new List<TaskCheck>();

        public bool Completed { get; set; } = false;

        public StoryStats StoryStats { get; set; } = new StoryStats();
    }
}

//name: string;
//projectAcronym: string;
//task: [string, boolean];
//subtasks: [string, boolean][] ;
//completed: boolean;