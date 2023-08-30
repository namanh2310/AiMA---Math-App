import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MathView, {MathText} from 'react-native-math-view';
import Header from '../../../../Components/Header';

const LRegressionSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const [step, setStep] = useState(false);

  return (
    <>
      <Header nav={'Linear Regression'} />
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Solution</Text>
        <MathText
          style={styles.mathText}
          value={`Firstly, calculate`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_i}\\), we have: \\(\\sum{x_i} = ${data.sum_x}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{x_i}^2\\), we have: \\(\\sum{x_i}^2 = ${data.sum_x_square}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{y_i}\\), we have: \\(\\sum{y_i} = ${data.sum_y}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\sum{y_i}^2\\), we have: \\(\\sum{x_{i}+y_{i}}^2 = ${data.sum_mul_xy}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\bar{y}\\), we have: \\(\\bar{y} = ${data.y_mean}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`\\(\\bar{x}\\), we have: \\(\\bar{x} = ${data.x_mean}\\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Secondly, we calculate  \\(a_{1} =\\frac{n\\sum{x_{i}y_{i}} - \\sum{x_i} \\sum{y_i}}{n\\sum{x_i}^2 - (\\sum{x_i})^2}\\)`}
          direction="ltr"
        />
        <MathText
          style={styles.mathText}
          value={`= \\(\\frac{${data.n}${data.sum_mul_xy} - ${data.sum_x}*${data.sum_y}}{${data.n}*${data.sum_x_square} - (${data.sum_x})^2}= ${data.a_0} \\) `}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`and we have: \\(a_{0} = \\bar{y} - \\bar{x}a_{1}\\) $$ = \\(${data.y_mean} - ${data.x_mean}*${data.a_1} = ${data.a_0}\\)`}
          direction="ltr"
        />

        <MathText
          style={styles.mathText}
          value={`Finally, subtitute \\(a_{0}\\) and \\(a_{1}\\) into \\(y = a_{0} + a_{1}x\\) $$ \\rightarrow \\( ${data.result}\\)`}
          direction="ltr"
        />
      </ScrollView>
    </>
  );
};

export default LRegressionSOL;

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
