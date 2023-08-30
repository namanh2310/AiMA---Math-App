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

const Simpson13RuleSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const equation = route.params.equation;
  const intFunct = route.params.intFunct;
  const n = route.params.n;
  const a = route.params.a;
  const b = route.params.b;
  const [step, setStep] = useState(false);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Result!!</Text>
        <View>
          <Text style={styles.result}>I = {data[0].I}</Text>
          <Text style={styles.result}>True value = {data[0].true_value}</Text>
          <Text style={styles.result}>Error = {data[0].error}</Text>
        </View>

        <View style={styles.stepField}>
          <TouchableOpacity onPress={() => setStep(!step)}>
            <Text style={styles.showStep}>Show step</Text>
          </TouchableOpacity>
          {step && data[0] && (
            <ScrollView style={styles.step_container}>
              <View style={styles.step1}>
                <Text style={styles.stepTitle}>
                  STEP 1: Find the true value of integral
                </Text>
                <Text style={styles.note}>
                  Take the anti-derivative of the function
                </Text>
                {/* <MathView
                config={{ex: 20}}
                math={`${equation}`}
                style={
                  equation.length > 25
                    ? styles.size_small
                    : equation.length < 10
                    ? styles.size_largerrr
                    : styles.size_large
                }
              /> */}
                <MathText value={`\\(${equation}\\)`} />
                {/* <MathView
                config={{ex: 20}}
                resizeMode="cover"
                math={`=${intFunct}`}
                style={
                  equation.length > 25
                    ? styles.size_small
                    : equation.length < 10
                    ? styles.size_largerrr
                    : styles.size_large
                }
              /> */}
                <MathText value={`\\(=${intFunct}\\)`} />

                <Text style={styles.note}>
                  Subtitute a and b to the above equation, we have the true
                  value:
                </Text>
                {/* <MathView
                config={{ex: 20}}
                resizeMode="cover"
                math={`truevalue(TV) = ${data[0].true_value}`}
                style={styles.size_largerr}
              /> */}
                <MathText value={`\\(TV = ${data[0].true_value}\\)`} />
              </View>

              <View style={styles.step2}>
                <Text style={styles.stepTitle}>
                  STEP 2: Using Simpson 1/3 Rule
                </Text>
                <Text style={styles.note}>We have the formula:</Text>
                {/* <MathView
                config={{ex: 20}}
                resizeMode="cover"
                math={`I = \\frac{h}{3}[f(x_{0})+4f(x_{1})+f(x_{2})]`}
                style={styles.size_mediumm}
              /> */}
                <MathText
                  value={`\\(I = \\frac{h}{3}[f(x_{0})+4f(x_{1})+f(x_{2})]\\)`}
                />
                {/* <MathView
                config={{ex: 20}}
                resizeMode="cover"
                math={`while: h = \\frac{b-a}{2}`}
                style={styles.size_largerrr}
              /> */}
                <Text style={styles.note}>While, we have</Text>
                <MathText value={`\\(h = \\frac{b-a}{2}\\)`} />
                <Text style={styles.note}>Apply this formula, we have:</Text>
                {/* <MathView
                config={{ex: 20}}
                resizeMode="cover"
                math={`I = \\frac{${n}}{3}[f(${a}+f(${n})+f(${b}))]`}
                style={styles.size_mediumm}
              /> */}
                <MathText
                  value={`\\(I = \\frac{${n}}{3}[f(${a}+f(${n})+f(${b}))]\\)`}
                />
                <MathView
                  config={{ex: 20}}
                  resizeMode="cover"
                  math={`Therefore: I = ${data[0].I}`}
                  style={styles.size_largerr}
                />
              </View>
              <View style={styles.step3}>
                <Text style={styles.stepTitle}>
                  STEP 3: Calculate the error
                </Text>
                {/* <MathView
                config={{ex: 20}}
                resizeMode="cover"
                math={`Error = \\frac{TV-I}{TV}*100%`}
                style={styles.size_larger}
              /> */}
                <MathText value={`\\(Error = \\frac{TV-I}{TV}*100%\\)`} />
                {/* <MathView
                config={{ex: 20}}
                resizeMode="cover"
                math={`= \\frac{${data[0].true_value}-${data[0].I}}{${data[0].true_value}}*100 = ${data[0].error} `}
                style={styles.size_mediumm}
              /> */}
                <MathText
                  value={`\\(= \\frac{${data[0].true_value}-${data[0].I}}{${data[0].true_value}}*100 = ${data[0].error}\\)`}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default Simpson13RuleSOL;

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
