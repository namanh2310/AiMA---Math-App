import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import MathView, {MathText} from 'react-native-math-view';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../Components/Header';

const Fundamental = () => {
  const [show, setShow] = useState(false);
  const route = useRoute();
  const result = route.params.data;
  const equation = route.params.equation;
  const step = route.params.step;
  const img = route.params.img;
  //70%

  return (
    <>
      <Header content={'Calculus'} />
      <View style={styles.container}>
        <View style={styles.infor}>
          <MathView
            // style={equation.length > 20 ? styles.size_medium : styles.size_larger}
            style={styles.equation}
            resizeMode="cover"
            math={equation}
          />
          <Text style={styles.text}>Solution:</Text>
          <MathView
            // style={
            //   result && result.length > 20 ? styles.size_medium : styles.size_larger
            // }
            style={styles.result}
            resizeMode="cover"
            math={result}
          />
          <TouchableOpacity
            style={styles.showStepBtn}
            onPress={() => setShow(!show)}>
            <Text style={styles.textBtn}>Show step</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.step}>
          <ScrollView style={{marginHorizontal: '5%'}}>
            {step !== null && step.length !== 0 ? (
              <>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 22,
                    fontFamily: 'Kanit-Regular',
                  }}>
                  The problem is:
                </Text>
                <MathText
                  style={styles.mathText}
                  value={`\\(${equation} \\)`}
                  direction="ltr"
                />
                {step.map(el => (
                  <>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 22,
                        fontFamily: 'Kanit-Regular',
                      }}>
                      Calculate the anti-derivative:
                    </Text>
                    <MathText
                      style={styles.mathText}
                      value={`\\( ${el[0]} \\) $$= \\(${el[1]} \\)`}
                      direction="ltr"
                    />

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 22,
                        fontFamily: 'Kanit-Regular',
                      }}>
                      Subtitute the range value to x, and then we can get the
                      result Therefore, we get the value
                    </Text>
                    <MathText
                      style={styles.mathText}
                      value={`\\( ${el[2]} \\)`}
                      direction="ltr"
                    />
                  </>
                ))}
                <Text
                  style={{
                    color: 'black',
                    fontSize: 22,
                    fontFamily: 'Kanit-Regular',
                  }}>
                  Finally, the result is:
                </Text>
                <MathText
                  style={styles.mathText}
                  value={`\\( ${result} \\)`}
                  direction="ltr"
                />
              </>
            ) : (
              <>
                {result.includes('x') && result.includes('=') ? (
                  <View style={{marginTop: '5%'}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 22,
                        fontFamily: 'Kanit-Regular',
                      }}>
                      The problem is:
                    </Text>
                    <MathText
                      style={styles.mathText}
                      value={`\\(${equation} \\)`}
                      direction="ltr"
                    />
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 22,
                        fontFamily: 'Kanit-Regular',
                      }}>
                      Switching the sign and isolating x, we can calculate x, we
                      have
                    </Text>
                    <MathText
                      style={styles.mathText}
                      value={`\\(${result} \\)`}
                      direction="ltr"
                    />
                  </View>
                ) : (
                  <>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 22,
                        fontFamily: 'Kanit-Regular',
                      }}>
                      The problem is
                    </Text>
                    <MathText value={` \\(${equation} \\)`} direction="ltr" />
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 22,
                        fontFamily: 'Kanit-Regular',
                      }}>
                      Do the basic calculation with operators, we have
                    </Text>
                    <MathText
                      value={`\\(${equation} = ${result} \\)`}
                      direction="ltr"
                    />
                  </>
                )}
              </>
            )}
            {img && (
              <Image
                source={{uri: img}}
                style={{width: '100%', height: undefined, aspectRatio: 1.5}}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Fundamental;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  infor: {
    flex: 0.3,
    backgroundColor: '#8252E7',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '10%',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    width: '100%',
  },
  equation: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
    maxWidth: '100%',
    // marginLeft: '5%',
  },
  result: {
    marginBottom: '5%',
    marginTop: '5%',
    color: '#fff',
    // marginLeft: '5%',
  },

  text: {
    fontSize: 24,
    fontWeight: 600,
    color: '#fff',
    // marginLeft: '5%',
  },
  showStepBtn: {
    width: '100%',
    height: 40,
    backgroundColor: '#E7E6E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  textBtn: {
    fontSize: 18,
    color: 'black',
    fontWeight: 500,
  },
  step: {
    // marginTop: '5%',
    flex: 0.7,
    // marginBottom: '5%',
  },
  stepText: {
    fontSize: 20,
    color: 'black',
    marginTop: '5%',
  },
  stepTitle: {
    fontFamily: 'Candal-Regular',
    fontSize: 20,
    color: 'black',
  },
  // size_medium: {
  //   height: '15%',
  // },
  // size_mediumm: {
  //   height: '10%',
  // },
  // size_large: {
  //   height: '5%',
  // },
  // size_larger: {
  //   height: '1%',
  // },
  mathText: {
    marginLeft: '3%',
  },
});
