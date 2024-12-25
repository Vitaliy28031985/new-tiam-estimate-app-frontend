export interface Projects {
  projects: {
    _id: string;
    title: string;
    description: string;
  }[];  
  total: number;
}

export interface ProjectsData {

    _id?: string;
    title: string;
    description: string;
    isShow?: boolean;
    isDelete?: boolean;

}

export interface Project {
    _id: string;
    title: string;
    description: string;
    isShow?: boolean;
    isDelete?: boolean;
    [key: string]: any; 
}