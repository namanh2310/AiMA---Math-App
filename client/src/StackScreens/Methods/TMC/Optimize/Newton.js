import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import Header from '../../../../Components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQuestion, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import Syntax from '../../../../Components/Syntax';

const Newton = ({navigation}) => {
  const route = useRoute();
  const header = route.params.header;
  const fields = route.params.fields;
  const handleSubmit = e => {
    e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Optimize/newtonmethod', {input}) //For Flask server
          .then(res => {
            console.log(res.data);
            // navigation.navigate('Newton Method SOL', {
            //   data: res.data.data,
            //   function: res.data.formula,
            //   firstDeri: res.data.firtDeri,
            //   secondDeri: res.data.secondDeri,
            // });
            // setErrorMessage(null);

            if (res.data.message) {
              setErrorMessage(res.data.message);
            } else {
              navigation.navigate('Newton Method SOL', {
                data: res.data.data,
                function: res.data.formula,
                firstDeri: res.data.firtDeri,
                secondDeri: res.data.secondDeri,
              });
              setErrorMessage(null);
            }
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
  const [input, setInput] = useState({
    function: 'x^5 - 5x^4 + x^3- 6x^2+7x+10',
  });
  const [result, setResult] = useState('x^5 - 5x^4 + x^3- 6x^2+7x+10');
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <>
      <Header nav={'TMCList'} />
      <View style={styles.container}>
        <Text style={styles.title}>NEWTON METHOD</Text>
        <View style={styles.input}>
          <View style={styles.functionField}>
            <TextInput
              defaultValue={result}
              placeholder="Function"
              onChangeText={text => handleChange('function', text)}
              style={styles.inputField}
            />
          </View>
          <View style={styles.variableFields}>
            <TextInput
              placeholder="x0"
              onChangeText={text => handleChange('x0', text)}
              style={{...styles.inputField, ...styles.variableField}}
            />

            <TextInput
              placeholder="error"
              onChangeText={text => handleChange('es', text)}
              style={{...styles.inputField, ...styles.variableField}}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Calculate</Text>
        </TouchableOpacity>

        {/* <Text>{result && JSON.stringify(result)}</Text> */}
        <Text style={{fontFamily: 'Kanit-Medium', color: 'red', fontSize: 16}}>
          {errorMessage}
        </Text>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: '0%',
            right: '0%',
          }}
          onPress={toggleModal}>
          <FontAwesomeIcon icon={faQuestionCircle} size={48} color="#b497f0" />
        </TouchableOpacity>
        <Syntax visible={modalVisible} onClose={toggleModal} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  title: {
    fontFamily: 'Candal-Regular',
    color: 'black',
    fontSize: 28,
  },
  input: {
    marginBottom: '5%',
    marginTop: '5%',
  },
  functionField: {
    // flex: 1,
  },
  inputField: {
    borderWidth: 3,
    borderColor: '#2874fc',
    borderRadius: 12,
    paddingLeft: 24,
    marginBottom: '5%',
    fontSize: 22,
  },
  variableFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
  },
  variableField: {
    flex: 0.48,
  },
  submitButton: {
    height: 48,
    backgroundColor: '#2874fc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    flex: 0.48,
    height: 48,
    backgroundColor: '#28f1fc',
    justifyContent: 'center',
    borderRadius: 12,
  },
  typeText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
  submitText: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'white',
  },
});

export default Newton;
