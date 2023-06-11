import axios from "axios";
import { API_URL } from '../../constants/config'

const editTaskApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 60000,
});

export const editTask = async (id: number, params: FormData) => {
  return editTaskApiClient
    .post(`/edit/${id}?developer=Name`, params)
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