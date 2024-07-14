import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CafeService from '../services/CafeService'; // Import CafeService
import UserService from '../services/UserService'; // Import CafeService
import GeoLocationService from '../api/GeoLocationService'

const SORT_DISTANCE = 1;
const SORT_RATING = 2;
const SORT_VISITORS = 3;
const SORT_NOW_VISITORS = 4;

function ExploreScreen({ navigation, route }) {
  const [userData, setUserData] = useState();
  const [textInputValue, setTextInputValue] = useState('');
  const [cafeTableList, setCafeTableList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({latitude:0, longitude : 0});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    loadCafeData();
  }, []);

  async function loadGeoLocation() {
    // 위치 정보 가져오기
    await GeoLocationService.getGeoLocation();
  
    // 가져온 위치 정보 확인
    let { location, errorMsg } = GeoLocationService.getLocationData();

    if (errorMsg) {
      console.error('Error fetching location:', errorMsg);
    } else if (location) {
      setLocation({ latitude: location.coords.latitude, longitude : location.coords.longitude});
    }
  }

  /** 카페 데이터 불러오기 */
  const loadCafeData = async () => {
    try {
      await loadGeoLocation();

      setLoading(true);
      const cafes = await CafeService.getCafesNearLocation(location.latitude, location.longitude, 100000);
      setCafeTableList(cafes.map(cafeData => (
        <CafeTable
          key={cafeData.id}
          cafeData={cafeData}
          userData={userData}
          navigation={navigation}
        />
      )));
    } catch (error) {
      console.error('Error loading cafes:', error);
    } finally {
      setLoading(false);
    }
  };



  const search = () => {
    const searchText = textInputValue.trim().toLowerCase();
  
    // 모든 카페 데이터에서 검색어에 맞는 카페 필터링
    const filteredCafes = cafeTableList.filter(cafe => {
      return cafe.props.cafeData.name.toLowerCase().includes(searchText) ||
             cafe.props.cafeData.address.toLowerCase().includes(searchText);
    });
  
    setCafeTableList(filteredCafes);
  };

  const sortCafeDataList = (type) => {
    let sortedCafes = [...cafeTableList];
  
    switch (type) {
      case SORT_DISTANCE:
        // 거리순 정렬 로직 추가
        sortedCafes.sort((cafeA, cafeB) => {
          // 예시: 거리에 따라 정렬하는 비교 로직
          // return cafeA.distance - cafeB.distance;
          return 0;
        });
        break;
      case SORT_RATING:
        // 별점순 정렬 로직 추가
        console.log("별점순")
        sortedCafes.sort((cafeA, cafeB) => {
          return cafeB.props.cafeData.averageReviewRating - cafeA.props.cafeData.averageReviewRating;
        });
        break;
      case SORT_VISITORS:
        // 방문자순 정렬 로직 추가
        
        sortedCafes.sort((cafeA, cafeB) => {
          return cafeB.props.cafeData.totalVisitors - cafeA.props.cafeData.totalVisitors;
        });
        break;
      case SORT_NOW_VISITORS:
        // 예약자순 정렬 로직 추가
        sortedCafes.sort((cafeA, cafeB) => {
          return cafeB.props.cafeData.currentVisitors - cafeA.props.cafeData.currentVisitors;
        });
        break;
      default:
        break;
    }
  
    // 정렬된 카페 데이터를 설정
    setCafeTableList(sortedCafes);
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.searchbarContainer}>
          <TextInput
            style={styles.textinputBox}
            onChangeText={(text) => setTextInputValue(text)}
            onSubmitEditing={search}
            value={textInputValue}
            placeholder="검색"
          />
          <TouchableOpacity style={styles.btnSearch} onPress={search}>
            <Ionicons name="search-outline" style={{ fontSize: 20, color: '#001D44' }} />
          </TouchableOpacity>
        </View>

        <View style={styles.SortContainer}>
          <TouchableOpacity style={styles.btnSort} onPress={() => sortCafeDataList(SORT_DISTANCE)}>
            <Text style={styles.btnSortText}> 거리순 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSort} onPress={() => sortCafeDataList(SORT_RATING)}>
            <Text style={styles.btnSortText}> 별점순 </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSort} onPress={() => sortCafeDataList(SORT_VISITORS)}>
            <Text style={styles.btnSortText}> 방문자순 </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSort}
            onPress={() => sortCafeDataList(SORT_NOW_VISITORS)}
          >
            <Text style={styles.btnSortText}> 예약자순 </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <ScrollView>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            cafeTableList
          )}
        </ScrollView>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const { cafeData, userData, navigation } = props;
  return (
    <TouchableHighlight
      style={styles.CafeTableContainer}
      onPress={() =>
        navigation.navigate('CafeDetail', {
          cafeData: cafeData,
          userData: userData,
        })
      }
      activeOpacity={0.5}
      underlayColor="#DDDDDD"
    >
      <>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            <Image
              source={{ uri: cafeData.logoImage }}
              style={{ width: '100%', height: '100%', borderRadius: 20 }}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContent}>
            <Text style={styles.nameText}>{cafeData.name}</Text>
            <Text style={styles.contentText}>{cafeData.address}</Text>
            <Text style={styles.contentText}>
              Open : {cafeData.openingTime} ~ Close : {cafeData.closingTime}
            </Text>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>
                <Ionicons name="star" style={{ color: 'gold' }}></Ionicons> {cafeData.averageReviewRating}
              </Text>
            </View>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    height: 180,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    flex: 3,
    backgroundColor: '#fafafa',
  },

  searchbarContainer: {
    flex: 2,
    marginTop: '10%',
    backgroundColor: '#fafafa',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textinputBox: {
    height: 40,
    paddingLeft: 20,
    width: '70%',
    borderColor: '#aaa',
    borderWidth: 1.5,
    borderRadius: 10,
    marginRight: 8,
    placeholderTextColor: '#aaa',
  },
  btnSearch: {
    width: 40,
    height: 40,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },

  SortContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnSort: {
    width: '22%',
    height: '95%',
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSortText: {
    color: '#555',
    fontSize: 13,
  },

  CafeTableContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  textContent: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    color: '#555',
  },
});

export default ExploreScreen;
