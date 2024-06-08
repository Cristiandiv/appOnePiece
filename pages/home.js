import {
    View,
    Image,
    StyleSheet,
    Button,
    SafeAreaView,
    Text,
    ImageBackground,
    TouchableOpacity
  } from 'react-native';
  import { useFonts, PirataOne_400Regular } from '@expo-google-fonts/pirata-one';
  import { DellaRespira_400Regular } from '@expo-google-fonts/della-respira';
  import { Audio } from 'expo-av';
  import React, { useEffect } from 'react';
  
  export default function Home() {
      useEffect(() => {
      async function playBackgroundAudio() {
        try {
          const backgroundSound = new Audio.Sound();
          await backgroundSound.loadAsync(require('../assets/weare.mp3'));
          await backgroundSound.setIsLoopingAsync(true);
          await backgroundSound.playAsync();
        } catch (error) {
          console.log('Erro ao reproduzir áudio de fundo:', error);
        }
      }
  
      playBackgroundAudio();
  
      return () => {
  
      };
    }, []);
  
    let [fontsLoaded, fontError] = useFonts({
      PirataOne_400Regular, DellaRespira_400Regular
    });
  
    if (!fontsLoaded && !fontError) {
      return null;
    }
  
    return (
       <View style={styles.container}>
  <ImageBackground
          source={require('../assets/bg.jpg')}
          style={styles.backgroundImage}
        />
  
        <View style={styles.containerTitulo}>
        <Image
            source={require('../assets/op.png')}
            style={styles.principal}
          />
        </View>
  
  
        <View style={styles.containerTexto}>
            <Text style={styles.titulo}>
              Entre na lista dos mais procurados

            </Text>

            <Image style={styles.img} source={require('../assets/capa-home.png')} />
        </View>

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    containerTitulo: {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      width: 400,
      marginTop: 50
    },
    principal: {
      width: 310,
      height: 110,
      borderRadius: 10,
      zIndex: 1,
    },
    containerTexto:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
      alignItems: 'center',
      textAlign: 'center',
      marginTop: 8,
      marginBottom: 15,
      paddingTop: 10,
      color: 'Black',
      fontSize: 42,
      fontFamily: 'PirataOne_400Regular',
    },
   backgroundImage: {
      resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.3,
      zIndex: -1,
    },

    img: {
      resizeMode: 'stretch',
      width: '50%',
      height: 280
    },

    btnCriar: {
      padding: 10,
      backgroundColor: '#6cb',
      borderRadius: 15,
    },
  });