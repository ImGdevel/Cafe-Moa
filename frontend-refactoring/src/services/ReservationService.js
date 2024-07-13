import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

class ReservationService {
  async createReservation(reservationRequestDTO) {
    try {
      const response = await axios.post(`${BASE_URL}/reservations`, reservationRequestDTO);
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  }

  async getReservation(id) {
    try {
      const response = await axios.get(`${BASE_URL}/reservations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reservation with ID ${id}:`, error);
      throw error;
    }
  }

  async deleteReservation(id) {
    try {
      await axios.delete(`${BASE_URL}/reservations/${id}`);
    } catch (error) {
      console.error(`Error deleting reservation with ID ${id}:`, error);
      throw error;
    }
  }

  async getAllReservations() {
    try {
      const response = await axios.get(`${BASE_URL}/reservations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all reservations:', error);
      throw error;
    }
  }
}

export default new ReservationService();
