import axios from 'axios';
import config from '@config';

const API_URL =  config.API_URL + '/cafes'


class CafeService {

  // 카페 생성
  async createCafe(cafeDTO) {
    try {
      const response = await axios.post(API_URL, cafeDTO);
      return response.data;
    } catch (error) {
      throw new Error(`Error creating cafe: ${error.message}`);
    }
  }

  // 카페 수정
  async updateCafe(id, cafeDTO) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, cafeDTO);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating cafe with ID ${id}: ${error.message}`);
    }
  }

  // 카페 조회
  async getCafe(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cafe with ID ${id}: ${error.message}`);
    }
  }

  // 카페 삭제
  async deleteCafe(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error(`Error deleting cafe with ID ${id}: ${error.message}`);
    }
  }

  // 모든 카페 조회
  async getAllCafes() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching all cafes: ${error.message}`);
    }
  }

  // 특정 위치 주변의 카페 조회
  async getCafesNearLocation(longitude, latitude, distanceMeters) {
    try {
      const response = await axios.get(`${API_URL}/near`, {
        params: {
          longitude: longitude,
          latitude: latitude,
          distanceMeters: distanceMeters
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching cafes near location: ${error.message}`);
    }
  }
}

export default new CafeService();

/*
    async addDummyCafes() {
        try {
            const dummyCafes = [
                {
                    name: 'Tea Time',
                    latitude: 37.54321,
                    longitude: 126.98765,
                    address: 'Seoul, South Korea',
                    openingTime: "08:00",
                    closingTime: "20:00",
                    seatCount: 40,
                    logoImage: 'https://dummyimage.com/80x80/000/fff.png&text=Cafe2',
                    cafeImages: 'https://dummyimage.com/600x400/000/fff.png&text=Cafe2',  // 배열 형태로 수정
                    notice: 'Welcome to Tea Time!',
                    averageReviewRating: 4.2,
                    reviewCount: 90,
                    totalVisitors: 250,
                    currentVisitors: 15,
                    createdAt: "2024-07-13T12:00:00Z"
                },
                {
                    name: 'Tea Time',
                    latitude: 37.54321,
                    longitude: 126.98765,
                    address: 'Seoul, South Korea',
                    openingTime: "08:00",
                    closingTime: "20:00",
                    seatCount: 40,
                    logoImage: 'https://dummyimage.com/80x80/000/fff.png&text=Cafe2',
                    cafeImages: 'https://dummyimage.com/600x400/000/fff.png&text=Cafe2',  // 배열 형태로 수정
                    notice: 'Welcome to Tea Time!',
                    averageReviewRating: 4.2,
                    reviewCount: 90,
                    totalVisitors: 250,
                    currentVisitors: 15,
                    createdAt: "2024-07-13T12:00:00Z"
                },
                // 추가적인 더미 카페 데이터를 필요한 만큼 추가하세요
            ];

    
            for (let cafe of dummyCafes) {
                await axios.post(`${API_URL}/cafes`, cafe);
            }
            console.log('Dummy cafes added successfully!');
        } catch (error) {
            console.error('Error adding dummy cafes:', error);
        }
    }*/