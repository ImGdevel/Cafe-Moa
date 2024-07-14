import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import getInfoStyle from "@styles/screens/InfoStyle";
import getCafeTableStyle from "@styles/components/CafeTableStyle";
import getFindStyle from "@styles/components/FindStyle";
import getReviewStyle from "@styles/components/ReviewStyle";
import Ionicons from 'react-native-vector-icons/Ionicons';

function CafeDetailScreen({ navigation, route }) {
  const { cafeData, userData } = route.params;
  const [direction, setDirection] = useState('사진');
  const [imageDatas, setImageDatas] = useState([]);

  useEffect(() => {
    console.log("submit",cafeData);
    loadCafeImages();
  }, [cafeData]);

  const loadCafeImages = async () => {
    const datas = [];
    const arr = cafeData.cafeImages;
    const promises = arr.map(async (imageUrl, index) => {
      const img = await getImage(imageUrl);
      datas.push({ image: img, id: index });
    });
    await Promise.all(promises);

    const sortedData = datas.sort((a, b) => b.date.seconds - a.date.seconds);
    setImageDatas(sortedData);
  };

  const CafeImages = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('사진 확대', { image: item.image })}
        style={getInfoStyle.imageContainer} 
      >
        <Image style={getInfoStyle.image} source={{ uri: item.image }} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={getInfoStyle.mainContainer}>
      <View style={getFindStyle.container}>
        <View style={getFindStyle.contentContainer}>
          <CafeTable cafeData={cafeData} userData={userData} navigation={navigation} />
        </View>
      </View>

      <View style={{ flex: 4.5 }}>
        <PreviewLayout
          selectedValue={direction}
          values={['사진', '좌석', '리뷰']}
          setSelectedValue={setDirection}
          style={getInfoStyle.contentLayout}
          cafeData={cafeData}
          userData={userData}
          navigation={navigation}
        >
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={imageDatas}
            style={getInfoStyle.picArea}
            renderItem={CafeImages}
            numColumns={3}
          />
        </PreviewLayout>
      </View>

      <View style={getInfoStyle.btnContainer}>
        <TouchableOpacity
          style={getInfoStyle.reserveButton} 
          onPress={() =>
            navigation.navigate('Reservation', {
              cafeData: cafeData,
              userData: userData,
            })
          }
        >
          <Text style={getInfoStyle.reserveButtonText}>예 약 하 기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CafeTable({ cafeData, userData, navigation }) {
  const [cafeName, setCafeName] = useState(cafeData.name);
  const [cafeLocation, setCafeLocation] = useState(cafeData.address);
  const [cafeInformation, setCafeInformation] = useState(
    `Open : ${cafeData.openingTime} ~ Close : ${cafeData.closingTime}`
  );
  const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.logoImage);

  useEffect(() => {
    setCafeName(cafeData.name);
    setCafeLocation(cafeData.address);
    setCafeInformation(`Open : ${cafeData.openingTime} ~ Close : ${cafeData.closingTime}`);
    setCafeLogoImage(cafeData.logoImage);
  }, [cafeData]);

  const Bookmark = () => {
    const cafeId = cafeData.id;
    const [icon, setIcon] = useState('heart-outline');
    const [iconStyle, setIconStyle] = useState({ fontSize: 30, color: 'black' });
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      // if (userData.isBookmarked(cafeId)) {
      //   setIcon('heart');
      //   setIconStyle({ fontSize: 30, color: '#e00' });
      //   setChecked(true);
      // }
    }, []);

    const bookMarked = async () => {
      if (checked) {
        await userData.deleteBookmark(cafeId);
        setIcon('heart-outline');
        setIconStyle({ fontSize: 30, color: 'black' });
        setChecked(false);
      } else {
        await userData.addBookmark(cafeId);
        setIcon('heart');
        setIconStyle({ fontSize: 30, color: '#e00' });
        setChecked(true);
      }
    };

    return <Ionicons name={icon} style={iconStyle} onPress={bookMarked} />;
  };

  return (
    <View style={getCafeTableStyle.container}>
      <View style={getCafeTableStyle.imageContainer}>
        <Image source={{ uri: cafeLogoImage }} style={getInfoStyle.cafeLogo} />
      </View>
      <View style={getCafeTableStyle.contentContainer}>
        <View style={getCafeTableStyle.textContent}>
          <View style={getCafeTableStyle.divideContent}>
            <Text style={getCafeTableStyle.nameText}>{cafeName}</Text>
            <Bookmark />
          </View>
          <Text style={getCafeTableStyle.contentText}>{cafeLocation}</Text>
          <Text style={getCafeTableStyle.contentText}>{cafeInformation}</Text>
        </View>
      </View>
    </View>
  );
}

function PreviewLayout({ children, values, selectedValue, setSelectedValue, cafeData, userData, navigation }) {
  return (
    <View style={getInfoStyle.previewContainer}>
      <Text style={getInfoStyle.previewTitle}></Text>
      <View style={getInfoStyle.row}>
        {values.map((value) => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[
              getInfoStyle.button,
              selectedValue === value && getInfoStyle.selected,
            ]}
          >
            <Text
              style={[
                getInfoStyle.buttonLabel,
                selectedValue === value && getInfoStyle.selectedLabel,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedValue === '사진' ? (
        <View style={getInfoStyle.container}>{children}</View>
      ) : selectedValue === '좌석' ? (
        <View style={getInfoStyle.seatContainer}>
          <Image source={cafeData ? { uri: cafeData.seatImage } : {}} style={getInfoStyle.seatPic} />
        </View>
      ) : (
        <ReviewPage cafeData={cafeData} userData={userData} navigation={navigation} />
      )}
    </View>
  );
}

function ReviewPage({ navigation, cafeData, userData }) {
  const [reviewList, setReviewList] = useState([]);
  const [notice, setNotice] = useState(cafeData.notice || '공지사항 내용(사업자가 작성한 공지사항)');
  const [rating, setRating] = useState(cafeData.averageReviewRating || 0);
  const [reviewDatas, setReviewDatas] = useState([]);


  useEffect(() => {
    //
  }, [cafeData.id]);

  useEffect(() => {
    const loadReview = async () => {
      const reviews = reviewDatas.map((review) => (
        <ReviewPanel key={review.id} review={review} />
      ));
      setReviewList(reviews);
    };

    loadReview();
  }, [reviewDatas]);

  return (
    <ScrollView style={getReviewStyle.container}>
      <View style={getReviewStyle.noticeHeader}>
        <Text style={getReviewStyle.noticeText}>
          <Ionicons name="alert-circle-outline" style={getReviewStyle.noticeIcon}></Ionicons> 사장님 공지
        </Text>
        <Text style={getReviewStyle.notice}>{notice}</Text>
      </View>
      <View style={getReviewStyle.ratingHeader}>
        <View style={getReviewStyle.ratingContainer}>
          <Ionicons name="star" style={getReviewStyle.ratingIcon}></Ionicons>
          <Text style={getReviewStyle.ratingText}>{rating}</Text>
        </View>
        <TouchableOpacity
          style={getReviewStyle.reviewButton}
          onPress={() => {
            navigation.navigate('리뷰 작성', { cafeData, userData });
          }}
        >
          <Text style={getReviewStyle.reviewButtonText}>리뷰 작성하기</Text>
        </TouchableOpacity>
      </View>
      <View>{reviewList}</View>
    </ScrollView>
  );
}

function ReviewPanel({ review }) {
  const [userName, setUserName] = useState('사용자');
  const [date, setDate] = useState('날짜');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (review) {
      const reviewDate = new Date(review.createdAt); // createdAt을 Date 객체로 파싱
      setUserName(review.authorName); // 예제에서는 authorName이 없으므로 적절한 사용자 데이터를 가져오는 방식으로 수정 필요
      setDate(
        `${leadingZeros(reviewDate.getMonth() + 1, 2)}/${leadingZeros(reviewDate.getDate(), 2)} (${leadingZeros(reviewDate.getHours(), 2)}:${leadingZeros(reviewDate.getMinutes(), 2)})`
      );
      setText(review.content);
      getAuthorImage(review.authorId); // authorId를 사용해 사용자 이미지 가져오기 함수 호출
    }
  }, [review]);

  const getAuthorImage = async (authorId) => {
    if (authorId) {
      // 사용자 데이터를 가져오는 로직 (UserDTO와 연결되는 방식으로 수정 필요)
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
          {/* Star 컴포넌트로 변경해야 할 수 있음 */}
          <View style={getReviewStyle.reviewMeta}>
            <Text style={getReviewStyle.reviewUser}>{userName}</Text>
            <Text style={getReviewStyle.reviewDate}>{date}</Text>
          </View>
        </View>
      </View>
      <Text style={getReviewStyle.reviewText}>{text}</Text>
    </View>
  );
}

export default CafeDetailScreen;
