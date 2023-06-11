import axios from "axios";
import { API_URL } from '../../constants/config'

const getTasksApiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
})

export const getTasks = async (page: number, sort: string, direction: string) => {
  return getTasksApiClient
    .get(`/?developer=Name&page=${page}&sort_field=${sort}&sort_direction=${direction}`)
    .then((response) => {
      return response.data
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