import axios from 'axios';
import config from '@config';

const API_URL = config.API_URL + '/reviews';

class ReviewService {
  async createReview(reviewDTO) {
    try {
      const response = await axios.post(API_URL, reviewDTO);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  }

  async deleteReview(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting review with ID ${id}:`, error);
      throw error;
    }
  }

  async getReviewById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching review with ID ${id}:`, error);
      throw error;
    }
  }

  async getReviewsByCafeId(cafeId) {
    try {
      const response = await axios.get(`${API_URL}/cafe/${cafeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for cafe with ID ${cafeId}:`, error);
      throw error;
    }
  }

  async getReviewsByUserId(userId) {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for user with ID ${userId}:`, error);
      throw error;
    }
  }

  async getAllReviews() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      throw error;
    }
  }
}

export default new ReviewService();
