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

const EulerMethodSOL = ({navigation}) => {
  const route = useRoute();
  const data = route.params.data;
  const intEquation = route.params.intEquation.replace(/\*/g, '');
  const equation = route.params.equation.replace(/\*/g, '');
  const c_constant = route.params.c_constant;
  const step_size = route.params.step_size;
  const [step, setStep] = useState(false);

  const tableHead = ['i', 'f(xi,yi)', 'x', 'y_euler', 'y_true'];
  const widthArr = [216, 216, 216, 216, 216];

  const tableData = data.map(e => Object.values(e));

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Result!!</Text>
        <ScrollView style={styles.tabField} horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row
                data={tableHead}
                widthArr={widthArr}
                style={styles.header}
                textStyle={styles.textHeader}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: '#F7F6E7'},
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>

        <View style={styles.stepField}>
          <TouchableOpacity onPress={() => setStep(!step)}>
            <Text style={styles.showStep}>Show step</Text>
          </TouchableOpacity>
          {step && data[1] && (
            <ScrollView style={styles.step_container}>
              <View style={styles.step1}>
                <Text style={styles.stepTitle}>STEP 1: Find y_true</Text>
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`Have:\\frac{dy}{dx}=${equation}`}
                  style={
                    equation.length > 20
                      ? styles.size_medium
                      : styles.size_larger
                  }
                />
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`\\rightarrow y  = ${intEquation}+C`}
                  style={intEquation.length < 20 && styles.size_larger}
                />
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`at⠀x = 0;⠀y = 1 \\rightarrow C = ${c_constant}`}
                  style={styles.size_large}
                />
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`\\rightarrow y = ${intEquation}+${c_constant}`}
                  style={intEquation.length < 20 && styles.size_larger}
                />
              </View>

              <View style={styles.step2}>
                <Text style={styles.stepTitle}>STEP 2: First iteration</Text>
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`Have: y_1 = y_0 + f(x_0,y_0) \\times h `}
                  style={styles.size_mediumm}
                />
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`= ${data[0].y_euler} + f(${data[0].x},${data[0].y_euler})\\times ${step_size}`}
                  style={styles.size_large}
                />
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`while: f(${data[0].x},${data[0].y_euler}) = ${data[0].slope}`}
                  style={styles.size_large}
                />
                <MathView
                  config={{ex: 15}}
                  resizeMode="cover"
                  math={`\\rightarrow y_1 = ${data[0].y_euler} + ${data[0].slope}(${step_size}) = ${data[1].y_euler} `}
                  style={styles.size_medium}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
};

export default EulerMethodSOL;

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
    flex: 0.1,
  },
  stepField: {
    flex: 0.9,
  },
  header: {
    height: 50,
    backgroundColor: '#2874fc',
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
  textHeader: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: '#E7E6E1',
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
  size_medium: {
    width: '85%',
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
});
