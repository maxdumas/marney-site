import data from "../assets/data.yml";

export const getCategories = () => Object.keys(data.projects);

export const getProjectsForCategory = (category) => data.projects[category];
