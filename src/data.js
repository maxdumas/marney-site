import data from "../assets/data.yml";

export const getCategories = () => data.categories;

export const getAboutData = () => data.about;

export const getProjectsForCategory = (category) => data.projects[category];

export const getProjectById = (id) =>
  Object.entries(data.projects)
    .flatMap(([category, ps]) => ps.map((p) => ({ category, ...p })))
    .find((p) => p.id === id);
