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

const TrapezoidalSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const slopeA = route.params.slopeA;
  const slopeB = route.params.slopeB;
  const first_deri = route.params.first_deri;
  const second_deri = route.params.second_deri;
  const f_2_der_mean = route.params.f_2_der_mean;
  const equation = route.params.equation;
  const a = route.params.a;
  const b = route.params.b;
  const [step, setStep] = useState(false);

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        <MathText
          style={styles.mathText}
          value={`Firstly, subtitute a = \\(${a} \\) and b = \\(${b} \\) into \\(${equation} \\) and calculate`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`We have: f(a) = \\(${slopeA} \\) and f(b) = \\(${slopeB} \\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Apply the formula: \\((b - a) \\frac{f(a) + f(b)}{2} = (${b} - ${a}) \\frac{${slopeA} + ${slopeB}}{2} = ${data[0].I}\\) `}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Finally, calculate error of the Trapezoidal Rule: $$ \\frac{-1}{12}f(\\xi)(b - a)^3`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`while \\(f''(\\xi) = \\int_{a}^{b}{\\frac{f''(x)dx}{b - a}}\\) `}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Take the first and second derivative respectively, we have`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`\\(f'(x) = ${first_deri} $$ f''(x) = ${second_deri}\\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Then, we have \\(f''(\\xi) = ${f_2_der_mean}\\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Therefore, error \\(E_t = ${data[0].error}\\) `}
          direction="ltr"
        />
      </ScrollView>
    </>
  );
};

export default TrapezoidalSOL;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#b8b8b8'},
  wrapper: {flexDirection: 'row', backgroundColor: '#d8d8d8'},
  title: {flex: 1, backgroundColor: '#f6f8fa'},
  row: {height: 26, width: '199%'},
  text: {textAlign: 'center', fontSize: 16},
  headerTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 28,
    color: 'black',
  },
  stepField: {
    flex: 1,
    marginTop: '2%',
  },
  listComponent: {
    width: '100%',
    marginLeft: '10%',
  },
  stepText: {
    fontSize: 20,
    color: 'black',
    marginBottom: '3%',
  },
  mathText: {
    fontSize: 45,
  },
});
