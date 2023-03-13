import axios from "axios";
import config from "../config/config"

const api = axios.create({
  baseURL: `https://gorest.co.in/public/v2/users`,
});

const accessToken = config.accessToken

const getAllUser = () => {
  return api.get("/", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const createUser = (user) => {
  return api.post("/", user, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const deleteUser = (id) => {
  return api.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

const updateUser = (id, user) => {
  return api.put(`/${id}`, user, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export default {
  getAllUser,
  createUser,
  deleteUser,
  updateUser
};
