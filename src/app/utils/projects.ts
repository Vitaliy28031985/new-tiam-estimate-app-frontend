import axios from "axios";
import { ProjectItem, Projects, ProjectsData } from "../interfaces/projects";
import BASE_URL from "./base";

export async function getAllProjects(page: number, limit: number): Promise<Projects | null> {

    const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/projects?page=${page}&limit=${limit}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const priceData: Projects = response.data;
    return priceData;
  } catch (error) {
    console.error('Error during request:', error);
    return null;
  }
  } 
}

export async function getProject(id: string | undefined): Promise<ProjectItem | null> {

    const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}api/projects/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const projectData: ProjectItem = response.data;
    return projectData;
  } catch (error) {
    console.error('Error during request:', error);
    return null;
  }
  } 
}

export async function addProject(data: ProjectsData) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'post',
      url: `${BASE_URL}api/projects`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
        data: { 
          title: data.title,
          description: data.description,
        }
    });
   return response.data;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}

export async function updatePrice(data: ProjectsData) {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'put',
      url: `${BASE_URL}api/projects/${data._id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }, 
      data: { 
         title: data.title,
         description: data.description,
          
        }
    });
   return response.data;
    } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}

export async function deleteProject(id: string | null) {
   const token = localStorage.getItem('token');
  if (!token) {
    return null;
  } else {
    try {
    const response = await axios({
      method: 'delete',
      url: `${BASE_URL}api/projects/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
   return response;
  } catch (error) {
      console.error('Error during request:', error);
      return null;
  }
  } 
}