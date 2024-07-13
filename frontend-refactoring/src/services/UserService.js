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

/*

    async addDummyData() {
        try {
            const dummyUsers = [
                  {
                    uid: 'WOISDQWD',
                    name: 'Alice1',
                    email: 'alice@email.com',
                },
                {
                    uid: 'SDJOQWIDSOA',
                    name: 'Bob2',
                    email: 'bob@email.com',
                },
                // 추가적인 더미 카페 데이터를 필요한 만큼 추가하세요
            ];

    
            for (let user of dummyUsers) {
                await axios.post(`${API_URL}`, user);
            }
            console.log('Dummy users added successfully!');
        } catch (error) {
            console.error('Error adding dummy users:', error);
        }
    }
    */