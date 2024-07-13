import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CafeService from '../services/CafeService'; // Import CafeService
import UserService from '../services/UserService'; // Import CafeService

const SORT_DISTANCE = 1;
const SORT_RATING = 2;
const SORT_VISITORS = 3;
const SORT_NOW_VISITORS = 4;

function ExploreScreen({ navigation, route }) {
  const [userData, setUserData] = useState();
  const [textInputValue, setTextInputValue] = useState('');
  const [cafeTableList, setCafeTableList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await LoadHomePage();
    });
    return unsubscribe;
  }, [navigation]);

  /** 유저 데이터 가져오기 */
  const LoadHomePage = async () => {

  };

  /** 카페 데이터 불러오기 */
  const loadCafeData = async () => {
    try {
      setLoading(true);
      const cafes = await CafeService.getAllCafes();
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

  useEffect(() => {
    loadCafeData();
  }, []);

  const search = () => {
    // 카페 데이터를 검색하기 위한 로직 추가
  };

  const sortCafeDataList = (type) => {
    // 카페 데이터를 정렬하는 로직 추가
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
