import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';
import Header from '../../../Components/Header';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';

const LinearAlgebra = ({navigation}) => {
  console.log(category);
  const categories = [
    {key: '1', value: 'A + B', disabled: false},
    {key: '2', value: 'A - B', disabled: false},
    {key: '3', value: 'A x B', disabled: false},
    {key: '4', value: 'A ● B', disabled: false},
    {key: '5', value: 'Convolution', disabled: false},
  ];

  const handleSubmit = e => {
    e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Calculus/linearalgebra', {input}) //For Flask server
          .then(res => {
            console.log(res.data);
            navigation.navigate('Linear Algebra SOL', {
              data: res.data,
            });
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log(input);
  };
  const [input, setInput] = useState();
  const [result, setResult] = useState(null);
  const [category, setCategory] = useState(null);
  const handleChange = (name, text) => {
    setInput({...input, [name]: text});
  };
  return (
    <>
      <Header nav={'TMCList'} />
      <View style={styles.container}>
        <Text style={styles.title}>Matrix Calculator</Text>
        <View style={styles.input}>
          <View style={styles.functionField}>
            <View style={styles.firstValue}>
              <TextInput
                multiline={true}
                returnKeyType="default"
                numberOfLines={5}
                placeholder={'1    2    3\n4    5    6\n7    8    9'}
                onChangeText={text => handleChange('x', JSON.stringify(text))}
                style={styles.inputField}
                // defaultValue="1,2,3,4,5,6,7"
              />
            </View>
            <View style={styles.firstValue}>
              <TextInput
                multiline={true}
                numberOfLines={5}
                placeholder={'1    2    3\n4    5    6\n7    8    9'}
                onChangeText={text => handleChange('y', JSON.stringify(text))}
                style={styles.inputField}
                // defaultValue="0.5,2.5,2.0,4.0,3.5,6.0,5.5"
              />
            </View>
          </View>
        </View>
        {category === '5' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 40,
            }}>
            <Text
              style={{
                width: '48%',
                fontFamily: 'Kanit-Regular',
                color: 'black',
                fontSize: 22,
              }}>
              Expected Matrix's Dimension:
            </Text>
            <TextInput
              placeholder="3x3"
              onChangeText={text => handleChange('size', JSON.stringify(text))}
              style={{
                borderColor: '#2874fc',
                borderRadius: 12,
                borderWidth: 3,
                width: '48%',
                paddingHorizontal: 18,
                fontSize: 16,
              }}
            />
          </View>
        )}
        <View>
          <SelectList
            placeholder="Category"
            setSelected={val => {
              handleChange('category', val);
              setCategory(val);
            }}
            data={categories}
            search={false}
            boxStyles={{
              borderRadius: 12,
              borderColor: '#2874fc',
              borderWidth: 3,
              alignItems: 'center',
            }}
            inputStyles={{
              fontSize: 22,
              fontFamily: 'Kanit-Light',
            }}
            dropdownTextStyles={{
              fontSize: 22,
              fontFamily: 'Kanit-Light',
            }}
            // save="value"
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Calculate</Text>
        </TouchableOpacity>
        {/* {category && <Text>{category}</Text>} */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '2%',
    gap: 16,
  },
  title: {
    fontFamily: 'Candal-Regular',
    color: 'black',
    fontSize: 26,
  },
  input: {
    // marginBottom: '5%',
    // marginTop: '5%',
  },
  functionField: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstValue: {
    width: '48%',
  },
  inputField: {
    height: 150,
    borderWidth: 3,
    borderColor: '#2874fc',
    borderRadius: 12,
    paddingLeft: 16,
    // marginBottom: '5%',
    fontSize: 22,
    textAlignVertical: 'top',
  },
  noteText: {
    fontSize: 18,
    color: 'black',
    // marginBottom: '1%',
  },

  submitButton: {
    height: 48,
    backgroundColor: '#2874fc',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitText: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'white',
  },
});

export default LinearAlgebra;
