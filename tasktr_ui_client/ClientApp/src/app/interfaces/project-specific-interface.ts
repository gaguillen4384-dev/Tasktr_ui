
export interface Project {
  name: string;
  acronym: string;
  numberOfStories: number;
}


export interface Story {
  name: string;
  projectAcronym: string;
  task: [string, boolean];
  subtasks: [string, boolean][];
  completed: boolean;
}


type TaskCheck = [string, boolean]
