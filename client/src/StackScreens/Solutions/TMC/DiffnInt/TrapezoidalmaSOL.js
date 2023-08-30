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

const TrapezoidalmaSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const middle_sum = route.params.middle_sum;
  const slope_sum = route.params.slope_sum;
  const array = route.params.array;
  const first_deri = route.params.first_deri;
  const second_deri = route.params.second_deri;
  const f_2_der_mean = route.params.f_2_der_mean;
  const equation = route.params.equation;
  const a = route.params.a;
  const b = route.params.b;
  const n = route.params.n;

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        <MathText
          style={styles.mathText}
          value={`Because n = ${n}, therefore, we will seperate the range to \\(${array}\\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`We apply the formula: $$I = \\(\\frac{(b - a)}{2n} f(x_0) + 2 \\sum^{n - 1}_{i = 1}{f(x_i)} + f(x_n)\\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`We have: $$\\(f(x_0) + f(x_n) = f(${a}) + f(${b}) = ${slope_sum}\\) $$ \\(\\sum^{n - 1}_{i = 1}{f(x_i)} = ${middle_sum}\\) `}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Subititute values into this formula, we have $$ \\(I =\\frac{(${b} - ${a})}{2}(${slope_sum} + ${middle_sum}) = ${data[0].I} \\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Finally, calculate error of the Trapezoidal MA Rule: $$ \\frac{-1}{12}\\sum_{i = 1}^{n}{f''(\\xi)}(b - a)^3`}
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

export default TrapezoidalmaSOL;

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
