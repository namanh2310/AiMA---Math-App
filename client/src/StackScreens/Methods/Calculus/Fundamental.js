import {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {html} from '../../../Components/html';
import axios from 'axios';
import Header from '../../../Components/Header';

const Fundamental = ({navigation}) => {
  const webviewRef = useRef();

  const handleSubmit = data => {
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Calculus/fundamental', {data})
          // .post('http://10.238.30.185:8081/Calculus/fundamental', {data})
          .then(res => {
            if (res.data.message) {
              console.log(res.data.message);
            } else {
              navigation.navigate('Fundamental SOL', {
                data: res.data.result,
                equation: res.data.equation,
                step: res.data.step,
                img: res.data.img,
              });
            }
            // console.log(res.data);
          });
      } catch (error) {
        if (error.response.status === 500) {
          setErrorMessage('Please re-check the input fields');
        } else if (error.response.status === 404) {
          setErrorMessage('Your are disconnecting with network!');
        }
      }
    };
    getData();
  };

  function onMessage(data) {
    console.log('log o day', data.nativeEvent.data);
    handleSubmit(data.nativeEvent.data);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header nav={'CalculusList'} />
      <WebView
        ref={webviewRef}
        style={{flex: 1, padding: 0, margin: 0}}
        scalesPageToFit={false}
        bounces={false}
        scrollEnabled={false}
        mixedContentMode="compatibility"
        onMessage={onMessage}
        source={{
          html: html,
        }}
      />
    </SafeAreaView>
  );
};

export default Fundamental;
