import axios from 'axios';
import config from '@config';

const API_URL =  config.API_URL + '/users';

class UserService {


    async createUser(userDTO) {
    try {
      const response = await axios.post(API_URL, userDTO);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser (id, userDTO) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userDTO);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error;
    }
  }

  async getUser(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }

  async getUserByUID(uid) {
    try {
      const response = await axios.get(`${API_URL}/uid/${uid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }
};

export default new UserService();
