// api.js
export const fetchSessionData = async (userId) => {

    const sessionData = {
        userId: 'userId',
        userName: '더미 유저', // 임의의 더미 데이터
        sessionToken: 'dummy-session-token',
    };
    return sessionData;


    const response = await fetch(`https://api.example.com/session/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }



    return response.json();
  };
  