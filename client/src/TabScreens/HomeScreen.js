import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {auth$} from '../Redux/selectors';
import {CALBG, GEOBG, TMCBG, PROBABG} from '../Image';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({navigation}) => {
  const auth = useSelector(auth$);
  const route = useRoute();
  // const test = route.params.test;
  console.log(data);
  const data = [
    {
      field: 'Calculus',
      background: CALBG,
      navLink: 'CalculusList',
    },
    {
      field: 'Geometric',
      background: GEOBG,
      navLink: 'GeoFundamental',
    },
    {
      field: 'TMC',
      background: TMCBG,
      navLink: 'TMCList',
    },
    {
      field: 'Probability',
      background: PROBABG,
      navLink: 'ProbaList',
    },
  ];

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 150);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -150],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateY: translateY}],
          // height: '15%',
          elevation: 4,
          zIndex: 100,
        }}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.welcomeText}>Hello, {auth.userName}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <FontAwesomeIcon icon={faBell} color="yellow" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBarContainer}>
            <TextInput style={styles.searchBar} placeholder="Search" />
          </View>
        </View>
      </Animated.View>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={e => scrollY.setValue(e.nativeEvent.contentOffset.y)}>
        <View style={styles.buffer}></View>
        <View style={styles.popularFieldsContainer}>
          <Text style={styles.popularText}>Popular Fields</Text>
          <View style={styles.popularFields}>
            {data.map((el, key) => (
              <TouchableOpacity
                key={key}
                style={{width: '47%'}}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(el.navLink)}>
                <ImageBackground
                  source={{uri: el.background}}
                  style={styles.popularField}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.popularPostsContainer}>
          <Text style={styles.popularText}>Popular Posts</Text>
          <View style={styles.popularPosts}>
            {/* <Image
              style={styles.popularPost}
              source={require('../../assets/image/nota.png')}
            /> */}

            <Image
              style={styles.popularPost}
              source={{
                uri: 'https://t3.ftcdn.net/jpg/04/72/09/24/360_F_472092463_biXCSvYsRVE8S05Ph7LbrxglfDr66MBE.jpg',
              }}
            />
            <Image
              style={styles.popularPost}
              source={{
                uri: 'https://images.squarespace-cdn.com/content/v1/586ec16bb3db2b558ebfec60/694329ee-2cd8-4786-9406-77ca00f30b07/math-header.jpg?format=1000w',
              }}
            />
            <Image
              style={styles.popularPost}
              source={{
                uri: 'https://n5a7d2f2.stackpathcdn.com/wp-content/uploads/2022/02/Brain-Math-Editorials-min.png',
              }}
            />
            <Image
              style={styles.popularPost}
              source={{
                uri: 'https://cdn.dribbble.com/users/1507491/screenshots/4945826/media/116a8ebc414c519ad1cfc0fe63f79d3e.jpg?compress=1&resize=400x300',
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 90,
            backgroundColor: 'transparent',
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  header: {
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    elevation: 4,
    backgroundColor: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: '#8252E7',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  welcomeText: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: 'white',
    marginTop: 15,
  },
  searchBarContainer: {
    marginTop: 15,
  },
  searchBar: {
    backgroundColor: '#faf9ff',
    borderRadius: 16,
    paddingLeft: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buffer: {
    width: '100%',
    height: 150,
  },
  scrollContainer: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  popularFieldsContainer: {
    marginTop: '8%',
  },
  popularText: {
    fontFamily: 'Candal-Regular',
    fontSize: 24,
    color: 'black',
  },
  popularFields: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  popularField: {
    backgroundColor: 'white',
    width: '100%',
    height: 154,
    borderRadius: 16,
    overflow: 'hidden',
    // margin: '2%',
    marginBottom: '5%',
    marginTop: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.06,
    elevation: 8,
    borderColor: '#8C60E9',
    borderWidth: 3,
    borderStyle: 'solid',
  },
  popularPostsContainer: {
    marginTop: '8%',
  },
  popularPosts: {},
  popularPost: {
    width: '100%',
    height: 240,
    borderWidth: 2,
    borderColor: '#c8c8c8',
    borderRadius: 16,
    marginBottom: '3%',
    marginTop: '3%',
  },
});
