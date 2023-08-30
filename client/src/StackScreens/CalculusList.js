import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalculator,
  faTableCells,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../Components/Header';

const CalculusList = ({navigation}) => {
  const data = [
    {
      cateName: 'Basic calculus',
      navLink: 'Fundamental',
      // icon: require('../../assets/image/calSymbol.png'),
    },
    {
      cateName: 'Linear Algebra',
      navLink: 'Linear Algebra',
      // icon: require('../../assets/image/matrixSymbol.png'),
    },
  ];
  return (
    <>
      <Header nav={'TabNavigator'} />

      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>CALCULUS</Text>
        </View>
        <ScrollView
          style={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {data.map((el, key) => (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                style={styles.category}
                onPress={() => navigation.navigate(el.navLink)}>
                <View style={styles.left}>
                  {/* <FontAwesomeIcon
                  style={styles.categoryIcon}
                  icon={el.icon}
                  size={40}
                  color={'#1c2e4d'}
                /> */}
                  {/* <Image style={styles.imgSymbol} source={el.icon} /> */}
                  <Text style={styles.categoryName}>{el.cateName}</Text>
                </View>
                <FontAwesomeIcon
                  style={styles.right}
                  icon={faPlay}
                  size={40}
                  color={'white'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default CalculusList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8252E7',
  },
  textContainer: {
    flex: 0.15,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 700,
    textAlign: 'center',
  },
  descText: {
    fontSize: 18,
    color: '#000',
  },
  scrollViewContainer: {
    flex: 0.85,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
  },
  cateText: {
    fontSize: 26,
    color: 'white',
    fontWeight: 500,
  },
  categoriesContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  category: {
    width: '100%',
    height: 100,
    backgroundColor: '#8C60E9',
    borderRadius: 32,
    marginVertical: '3%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
    borderColor: '#521DD2',
    borderStyle: 'solid',
    borderWidth: 3,
  },
  categoryName: {
    color: 'white',
    fontSize: 24,
    marginLeft: '8%',
    fontWeight: 800,
  },
  left: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    marginRight: 16,
  },
  imgSymbol: {
    width: '35%',
    height: '100%',
  },
});
