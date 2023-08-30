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

const Simpson38SOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const result = data.data[0];
  const array = data.array;
  const points_value = data.points_value;
  const n = data.n;
  const a = data.a;
  const b = data.b;
  const intFunct = data.intFunct;
  // const intFunct = route.params.intFunct;
  // const n = route.params.n;
  // const a = route.params.a;
  // const b = route.params.b;
  const [step, setStep] = useState(false);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Result!!</Text>
        <View>
          <Text style={styles.result}>I = {result.I}</Text>
          <Text style={styles.result}>True value = {result.true_value}</Text>
          <Text style={styles.result}>Error = {result.error}</Text>
        </View>

        <View style={styles.stepField}>
          <TouchableOpacity onPress={() => setStep(!step)}>
            <Text style={styles.showStep}>Show step</Text>
          </TouchableOpacity>
          {step && (
            <ScrollView style={styles.step_container}>
              <View style={styles.step1}>
                <Text style={styles.stepTitle}>
                  STEP 1: Determining the list of numbers from a to b
                </Text>
                <Text style={styles.note}>
                  We separate the integral based on n = {n} , so the segments
                  are {JSON.stringify(array)}
                </Text>
                <Text style={styles.stepTitle}>
                  STEP 2: Calculate the true value:
                </Text>
                <MathText value={`\\(\\int_{a}^{b}{f(x)} = ${intFunct} \\)`} />
                <Text style={styles.note}>
                  Subtitute a = {a} and b = {b}
                </Text>
                <MathText value={` \\(= ${result.true_value}\\)`} />
                <Text style={styles.stepTitle}>
                  STEP 3: Apply the formula to find the integral:
                </Text>
                <MathText
                  value={` \\(\\frac{h}{3}[f(x_0) + 4f(x_1) + f(x_2)]  \\)`}
                />
                <MathText
                  value={` while: \\(h = \\frac{b - a}{2} = \\frac{x_{2} - x_{0}}{2} \\)`}
                />
                <MathText
                  value={` Therefore \\(I = \\frac{${a} - ${b}}{2} / 3 \\cdot [${points_value}]  \\)`}
                />
                <Text style={styles.stepTitle}>
                  STEP 4: Calculate the error:
                </Text>
                <MathText
                  value={`\\(Error = \\frac{TV - I}{TV} = \\frac{${result.true_value} - ${result.I}}{${result.true_value}} = ${result.error}\\)`}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default Simpson38SOL;

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
