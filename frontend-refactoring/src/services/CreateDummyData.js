import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/cafes'; // 예제에서는 localhost의 포트 8080을 기준으로 설정

const dummyCafes = [
  {
    name: 'Coffee House',
    latitude: 37.12345,
    longitude: 126.67890,
    address: 'Seoul, South Korea',
    openingTime: '08:00',
    closingTime: '20:00',
    seatCount: 50,
    logoImage: 'https://dummyimage.com/80x80/000/fff.png&text=Cafe1',
    cafeImages: ['https://dummyimage.com/600x400/000/fff.png&text=Cafe1'],
    notice: 'Welcome to Coffee House!',
    averageReviewRating: 4.5,
    reviewCount: 120,
    totalVisitors: 300,
    currentVisitors: 25,
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Tea Time',
    latitude: 37.54321,
    longitude: 126.98765,
    address: 'Seoul, South Korea',
    openingTime: '07:00',
    closingTime: '22:00',
    seatCount: 40,
    logoImage: 'https://dummyimage.com/80x80/000/fff.png&text=Cafe2',
    cafeImages: ['https://dummyimage.com/600x400/000/fff.png&text=Cafe2'],
    notice: 'Welcome to Tea Time!',
    averageReviewRating: 4.2,
    reviewCount: 90,
    totalVisitors: 250,
    currentVisitors: 15,
    createdAt: new Date().toISOString(),
  },
  // 추가적인 더미 카페 데이터를 필요한 만큼 추가하세요
];

const addDummyCafes = async () => {
  try {
    for (let cafe of dummyCafes) {
      await axios.post(BASE_URL, cafe);
    }
    console.log('Dummy cafes added successfully!');
  } catch (error) {
    console.error('Error adding dummy cafes:', error);
  }
};
