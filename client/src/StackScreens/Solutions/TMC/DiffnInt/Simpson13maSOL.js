import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import MathView, {MathText} from 'react-native-math-view';
import Header from '../../../../Components/Header';

const Simpson13maSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const obj = data.data;
  const true_value = obj[0].true_value;
  const I = obj[0].I;
  const error = obj[0].error;
  const array = data.array;
  const denominator = data.denominator;
  const n = data.n;
  const intFunct = data.intFunct;
  const inputFunct = data.input_funct;
  console.log(typeof array);

  const [step, setStep] = useState(false);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Result!!</Text>
        <View>
          <Text style={styles.result}>I = {obj[0].I}</Text>
          <Text style={styles.result}>True value = {obj[0].true_value}</Text>
          <Text style={styles.result}>Error = {obj[0].error}</Text>
        </View>

        <View style={styles.stepField}>
          <TouchableOpacity onPress={() => setStep(!step)}>
            <Text style={styles.showStep}>Show step</Text>
          </TouchableOpacity>
          {step && obj[0] && (
            <ScrollView style={styles.step_container}>
              <View style={styles.step1}>
                <Text style={styles.stepTitle}>
                  STEP 1: Find all segments from a to b
                </Text>
                <Text style={styles.note}>
                  We separate the integral based on n = {n} , so the segments
                  are {JSON.stringify(array)}
                </Text>
                <Text style={styles.stepTitle}>
                  STEP 2: Calculate the true value:
                </Text>
                <MathText value={`\\(${inputFunct} $$ = ${intFunct}\\)`} />
                <Text style={styles.note}>
                  Subtitute a and b into the above, we have:
                </Text>
                <MathText value={`\\(TV = ${true_value}\\)`} />
                <Text style={styles.stepTitle}>STEP 3: Apply the formula:</Text>

                <MathText
                  value={`\\(I = (b - a)\\frac{f(x_0)4\\sum{i_{odd}}^{n-1}{f(x_i)} + 2\\sum{j_{even}f(x_j)+f(x_n)}}{3n}   \\)`}
                />
                <MathText
                  value={`\\(I = (${array[array.length - 1]} - ${
                    array[0]
                  })\\frac{${denominator}}{3 \\cdot ${n}} = ${I}  \\)`}
                />
                <Text style={styles.stepTitle}>
                  STEP 4: Calculate the error:
                </Text>
                <MathText
                  value={`\\(Error = \\frac{TV - I}{TV} = \\frac{${true_value} - ${I}}{${true_value}} = ${error}\\)`}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default Simpson13maSOL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  title: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: '#2874fc',
  },
  tabField: {
    // flex: 0.3,
  },
  stepField: {
    flex: 1,
  },
  result: {
    fontSize: 24,
    color: 'black',
  },
  showStep: {
    marginTop: '5%',
    fontSize: 24,
    color: '#2874fc',
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  step_container: {
    marginTop: '3%',
  },

  stepTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'black',
  },

  size_small: {
    width: '100%',
  },
  size_medium: {
    width: '90%',
  },
  size_mediumm: {
    width: '75%',
  },
  size_large: {
    width: '65%',
  },
  size_larger: {
    width: '60%',
  },
  size_largerr: {
    width: '50%',
  },
  size_largerrr: {
    width: '40%',
  },
  note: {
    fontSize: 20,
    color: 'black',
  },
});
