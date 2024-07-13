import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users'; // 예제에서는 localhost의 포트 8080을 기준으로 설정

const UserService = {
  createUser: async (userDTO) => {
    try {
      const response = await axios.post(BASE_URL, userDTO);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (id, userDTO) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, userDTO);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  },

  getUser: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },
};

export default UserService;
