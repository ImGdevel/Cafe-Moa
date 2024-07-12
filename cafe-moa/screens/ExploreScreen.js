import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SORT_DISTANCE = 1;
const SORT_RATING = 2;
const SORT_VISITORS = 3;
const SORT_NOW_VISITORS = 4;

function ExploreScreen({ navigation, route }) {
  const [userData, setUserData] = useState();
  const [textInputValue, setTextInputValue] = useState('');
  const [cafeTableList, setcafeTableList] = useState([]);
  const [cafeDatas, setcafeDatas] = useState([]);
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

  /** 시작 */
  const FindStart = async () => {

  };

  /** 카페 리스트 출력 */
  useEffect(() => {
    CafeListLoad();
  }, [cafeDatas]);

  /** 카페리스트 출력 */
  const CafeListLoad = () => {
    const cafeList = cafeDatas.map((cafeData) => (
      <CafeTable
        key={cafeData.getId()}
        cafeData={cafeData}
        userData={userData}
        navigation={navigation}
      />
    ));
    setcafeTableList(cafeList);
  };

  const search = () => {
    // 카페데이터 불러오기

  };

  const sortCafeDataList = (type) => {
    if (cafeService == null) {
      return;
    }
    const sortedData = cafeService.sortCafeData(type);
    setcafeDatas(sortedData);
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
        <ScrollView>{cafeTableList}</ScrollView>
      </View>
    </View>
  );
}

function CafeTable(props) {
  const { cafeData, userData, navigation } = props;

  const [cafeName, setCafeName] = useState(cafeData.getName());
  const [cafeLocation, setCafeLocation] = useState(cafeData.getAdress(1, 3));
  const [cafeInformation, setCafeInformaion] = useState(
    `Open : ${cafeData.getOpenTime()}:00 ~ Close : ${cafeData.getCloseTime()}:00`
  );
  const [cafeLogoImage, setCafeLogoImage] = useState(cafeData.getLogo());
  const [rating, setRating] = useState(cafeData.getRating());

  useEffect(() => {
    setCafeName(cafeData.getName());
    setCafeLocation(cafeData.getAdress(1, 3));
    setCafeInformaion(
      `Open : ${cafeData.getOpenTime()}:00 ~ Close : ${cafeData.getCloseTime()}:00`
    );
    setCafeLogoImage(cafeData.getLogo());
    if (rating == null) {
      setRating(cafeData.getRating());
    } else {
      dbService.collection('CafeData').doc(cafeData.getId()).onSnapshot((data) => {
        const rate = data.data().rating;
        setRating(rate);
      });
    }
  }, [cafeData]);

  return (
    <TouchableHighlight
      style={styles.CafeTableContainer}
      onPress={() =>
        navigation.navigate('CafeInfo', {
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
              source={{ uri: cafeLogoImage }}
              style={{ width: '100%', height: '100%', borderRadius: 20 }}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.textContent}>
            <Text style={styles.nameText}>{cafeName}</Text>
            <Text style={styles.contentText}>{cafeLocation}</Text>
            <Text style={styles.contentText}>{cafeInformation}</Text>
            <View styles={styles.iconContainer}>
              <Text style={styles.icon}>
                <Ionicons name="star" style={{ color: 'gold' }}></Ionicons> {rating}
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

  filterContainer: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#f8f8f8',
  },
  btnFilter: {
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
