import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Switch,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBook, faCamera} from '@fortawesome/free-solid-svg-icons';
const ScanScreen = ({navigation}) => {
  const [img, setImg] = useState();
  const [test, setTest] = useState();
  const [isCrop, setIsCrop] = useState(false);

  const specialAlgorithm = (algorithm, funct, type) => {
    navigation.navigate(algorithm, {function: funct, type: type});
  };

  const handleSubmit = async data => {
    try {
      const response = await axios.post(
        'http://localhost:8081/AIforWeb/AIforApp',
        {img},
      ); // For Flask server
      const data = response.data.eq;
      const complex = response.data.complex;
      // Perform computation using data
      if (!complex) {
        const computationResponse = await axios.post(
          'http://localhost:8081/Calculus/fundamental',
          {data},
        );

        navigation.navigate('Fundamental SOL', {
          data: computationResponse.data.result,
          equation: computationResponse.data.equation,
          step: computationResponse.data.step,
          img: computationResponse.data.img,
        });
      } else {
        algorithm = response.data.algorithm;
        funct = response.data.function;
        type = response.data.type;
        specialAlgorithm(algorithm, funct, type);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const upload = () => {
    ImagePicker.openPicker({
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 300,
      cropping: isCrop,
      includeBase64: true,
      width: 1000,
      height: 300,
    }).then(image => {
      setTest(`data:${image.mime};base64,${image.data}`);
      const uri = image.path;
      const type = 'image/png';
      const name = 'image';
      const source = {uri, type, name};
      handleUpload(source);
    });
  };
  const handleUpload = image => {
    const data = new FormData();
    console.log(data);
    data.append('file', image);
    data.append('upload_preset', 'thesisapp');
    data.append('cloud_name', 'dktopqn1g');
    fetch('https://api.cloudinary.com/v1_1/dktopqn1g/image/upload', {
      method: 'post',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        setImg(data.url);
      })
      .catch(err => {
        console.log('Error While Uploading');
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const uri = image.path;
      const type = 'image/png';
      const name = 'image';
      const source = {uri, type, name};
      handleUpload(source);
    });
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTest();
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.scrollContainer}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option1Container} onPress={upload}>
            <View style={styles.option1Style}>
              <FontAwesomeIcon
                icon={faBook}
                color={'#2874fc'}
                size={20}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Pick Image From Gallery</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option2Container}
            onPress={openCamera}>
            <View style={styles.option2Style}>
              <FontAwesomeIcon
                icon={faCamera}
                color={'#2874fc'}
                size={20}
                style={styles.optionIcon}
              />
              <Text style={styles.optionText}>Camera</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Enable Crop:</Text>
          <Switch
            trackColor={{false: '#fff', true: '#4BB543'}}
            thumbColor={isCrop ? '#fff' : '#c8c8c8'}
            value={isCrop}
            onValueChange={value => setIsCrop(value)}
          />
        </View>
      </ScrollView>

      <View style={styles.imageContainer}>
        {test && (
          <Image
            source={{
              uri: test,
            }}
            style={styles.imageStyle}
          />
        )}
      </View>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: '3%',
    gap: 24,
    justifyContent: 'center',
  },
  optionsContainer: {
    flex: 0.4,
    justifyContent: 'flex-end',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    // borderColor: '#8252E7',
    // borderWidth: 2,
    borderRadius: 12,
  },
  option1Container: {
    flex: 0.5,
    justifyContent: 'center',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 2,
  },
  option1Style: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '5%',
  },
  optionIcon: {
    position: 'relative',
    bottom: '-1.5%',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 400,
    color: '#333232',
    marginLeft: '3%',
  },
  option2Container: {
    flex: 0.5,
    justifyContent: 'center',
  },
  option2Style: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '5%',
  },
  option2Icon: {
    position: 'relative',
    bottom: '-1.5%',
  },
  submitButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#8252E7',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {fontFamily: 'Kanit-Medium', fontSize: 22, color: '#fff'},
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 48,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#8252E7',
  },
  switchText: {
    fontFamily: 'Kanit-Regular',
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  imageStyle: {
    width: '95%',
    height: undefined,
    aspectRatio: 3,
    resizeMode: 'contain',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
  },
});
