import axios from "axios";

const baseUrl = "http://localhost:3001/api/tasks";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newTask) => {
  const response = await axios.post(baseUrl, newTask);
  return response.data;
};

const update = async (id, updatedFields) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedFields);
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };