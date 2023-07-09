
export interface Project {
  name: string;
  acronym: string;
  numberOfStories: number;
}


export interface Story {
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

export interface FullProject {
  id: string;
  project: Project;
  stories: Story[];
}
