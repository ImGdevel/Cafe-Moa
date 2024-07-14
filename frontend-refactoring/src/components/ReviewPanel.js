import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import getReviewStyle from "../styles/components/ReviewStyle";

function ReviewPanel({ review }) {
  const [userName, setUserName] = useState('사용자');
  const [date, setDate] = useState('날짜');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (review) {
      const reviewDate = new Date(review.createdAt);
      setUserName(review.author.name);
      setDate(
        `${leadingZeros(reviewDate.getMonth() + 1, 2)}/${leadingZeros(reviewDate.getDate(), 2)} (${leadingZeros(reviewDate.getHours(), 2)}:${leadingZeros(reviewDate.getMinutes(), 2)})`
      );
      setText(review.content);
      setRating(review.rating);
      getAuthorImage(review.author.id);
    }
  }, [review]);

  const getAuthorImage = async (authorId) => {
    if (authorId) {
      // 사용자 데이터를 가져오는 로직 (UserDTO와 연결되는 방식으로 수정 필요)
      // 예시: setImage(await fetchUserImage(authorId));
    } else {
      setImage(require('@img/initialProfile.jpg')); // 기본 이미지 설정
    }
  };

  const leadingZeros = (n, digits) => {
    let zero = '';
    n = n.toString();
    if (n.length < digits) {
      for (let i = 0; i < digits - n.length; i++) zero += '0';
    }
    return zero + n;
  };

  return (
    <View style={getReviewStyle.reviewContainer}>
      <View style={getReviewStyle.reviewHeader}>
        <Image style={getReviewStyle.profileImage} source={image} />
        <View style={getReviewStyle.reviewInfo}>
          <View style={getReviewStyle.reviewMeta}>
            <Text style={getReviewStyle.reviewUser}>{userName}</Text>
            <Text style={getReviewStyle.reviewDate}>{date}</Text>
            <View style={getReviewStyle.ratingContainer}>
              <Text style={getReviewStyle.ratingText}>Rating: {rating}</Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={getReviewStyle.reviewText}>{text}</Text>
    </View>
  );
}

export default ReviewPanel;