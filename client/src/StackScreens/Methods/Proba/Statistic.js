import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import axios from 'axios';

const Statistic = ({navigation}) => {
  const handleSubmit = e => {
    e.preventDefault();
    const getData = async () => {
      try {
        await axios
          .post('http://localhost:8081/Probability/statistic', {input}) //For Flask server
          .then(res => {
            console.log(res.data);
            navigation.navigate('Statistic Calculator SOL', {
              data: res.data,
              input: input,
              sum: input.join(',').replace(/,/g, '+'),
              product: input.join(',').replace(/,/g, '*'),
              productRes: eval(input.join(',').replace(/,/g, '*')),
            });
          });
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    console.log(eval(input.join(',').replace(/,/g, '*')));
  };
  const [input, setInput] = useState();
  const [result, setResult] = useState(null);
  const handleChange = text => {
    setInput(text.split(',').map(parseFloat));
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>STATISTIC CALCULATOR</Text>
      <View style={styles.input}>
        <View style={styles.functionField}>
          <View style={styles.firstValue}>
            <Text style={styles.noteText}>
              Provide values seperated by commas
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="P(A)"
              onChangeText={text => handleChange(text)}
              style={styles.inputField}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Calculate</Text>
      </TouchableOpacity>
      {result && <Text>{JSON.stringify(result)}</Text>}
    </View>
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
    fontSize: 26,
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
    paddingLeft: 16,
    marginBottom: '5%',
    fontSize: 22,
    textAlignVertical: 'top',
  },
  noteText: {
    fontSize: 18,
    color: 'black',
    marginBottom: '1%',
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

export default Statistic;
