
export type Project = {
  name: string;
  acronym: string;
  projectStats: ProjectStats;
}


export type Story = {
  name: string;
  projectAcronym: string;
  task: TaskCheck;
  subtasks: TaskCheck[];
  storyStats: StoryStats;
  completed: boolean;
}

export type TaskCheck = {
  taskAction: string;
  completed: boolean;
};

export type ProjectStats = {
  numberOfTotalStories: number;
  numberOfActiveStories: number;
  numberOfCompletedStories: number;
}

export type StoryStats = {
  numberOfCompletedTasks: number;
  numberOfTasks: number;
}

export type FullProject = {
  id: string;
  project: Project;
  stories: Story[];
}
