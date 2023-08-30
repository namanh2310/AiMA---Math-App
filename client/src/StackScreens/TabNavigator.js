import {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../TabScreens/HomeScreen';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faCamera,
  faUserGroup,
  faUserEdit,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import ScanScreen from '../TabScreens/ScanScreen';
import User from '../TabScreens/User';
import Notification from '../TabScreens/Notification';
import Main from '../TabScreens/Forum/Main';
import Empty from './Empty';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [hide, setHide] = useState(false);

  function getWidth() {
    let width = Dimensions.get('window').width;

    // Horizontal Padding = 20...
    width = width - 80;

    // Total five Tabs...
    return width / 5;
  }
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            bottom: '2%',
            marginHorizontal: 20,
            borderRadius: 24,
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 50,
              height: 50,
            },
            paddingHorizontal: 20,
          },
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Tab.Screen
          name="HomeScreen"
          component={HomePage}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faHouse}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
                {/* <Text
                style={
                  focused ? styles.controllerTextActive : styles.controllerText
                }>
                Home
              </Text> */}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="Empty"
          component={Empty}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faBell}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
                {/* <Text
                style={
                  focused ? styles.controllerTextActive : styles.controllerText
                }>
                Alert
              </Text> */}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="ScanScreen"
          component={ScanScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <>
                <View style={styles.activeBtn}>
                  <FontAwesomeIcon
                    icon={faCamera}
                    // color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                    color="white"
                    size={24}
                  />
                </View>
              </>
            ),
          }}
          listeners={{
            tabPress: () => {
              // Prevent default action
              setHide(true);
            },
          }}
        />

        <Tab.Screen
          name="Main"
          component={Main}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faUserGroup}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
                {/* <Text
                style={
                  focused ? styles.controllerTextActive : styles.controllerText
                }>
                Forum
              </Text> */}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.controllerBtn}>
                <FontAwesomeIcon
                  icon={faUserEdit}
                  color={focused ? 'rgba(34,115,254,255)' : '#737373'}
                  size={24}
                />
                {/* <Text
                style={
                  focused ? styles.controllerTextActive : styles.controllerText
                }>
                User
              </Text> */}
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              setHide(false);
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>

      <Animated.View
        style={
          hide
            ? {
                display: 'none',
                width: getWidth() - 20,
                height: 4,
                backgroundColor: 'rgba(34,115,254,255)',
                position: 'absolute',
                bottom: 70,
                // Horizontal Padding = 20...
                left: 50,
                borderRadius: 20,
                transform: [{translateX: tabOffsetValue}],
              }
            : {
                width: getWidth() - 20,
                height: 3,
                backgroundColor: 'rgba(34,115,254,255)',
                position: 'absolute',
                bottom: 70,
                // Horizontal Padding = 20...
                left: 50,
                borderRadius: 20,
                transform: [{translateX: tabOffsetValue}],
              }
        }></Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  controllerBtn: {
    display: 'flex',
    alignItems: 'center',
  },
  activeBtn: {
    position: 'absolute',
    top: '-30%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(34,115,254,255)',
  },
});

export default TabNavigator;
