import axios from "axios";
import { API_URL } from '../../constants/config'

const createTaskApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 60000,
})

export const createTask = async (params: FormData) => {
  return createTaskApiClient
    .post(`/create?developer=Name`, params)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log(`Error message: ${error.message}`);
      }
    });
};