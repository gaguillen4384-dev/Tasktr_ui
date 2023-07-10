
export type Project = {
  name: string;
  acronym: string;
  numberOfStories: number;
}


export type Story = {
  name: string;
  projectAcronym: string;
  task: TaskCheck;
  subtasks: TaskCheck[];
  completed: boolean;
}

export type TaskCheck = {
  taskAction: string;
  completed: boolean;
};

export type FullProject = {
  id: string;
  project: Project;
  stories: Story[];
}
