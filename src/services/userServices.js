import AxiosClient from "./axiosConfig";
export default {
  getUsers() {
    return AxiosClient.get("/users");
  },
  createUser(userData) {
    return AxiosClient.post("http://httpbin.org/post", userData);
  },
};
