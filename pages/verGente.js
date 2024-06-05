import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Text,
    ImageBackground
  } from 'react-native';
  import { useFonts, PirataOne_400Regular } from '@expo-google-fonts/pirata-one';
  import { DellaRespira_400Regular } from '@expo-google-fonts/della-respira';
  import { Audio } from 'expo-av';
  import React, { useEffect } from 'react';
  
  export default function verGente() {
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
  
  
  <ScrollView>
        <View style={styles.containerTexto}>
            <Text style={styles.titulo}>
              
            </Text>
        </View>
  </ScrollView>
  
  
  
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
      justifyContent: 'center',
      marginTop: 8,
      marginBottom: 15,
      paddingTop: 10,
      color: 'Black',
      fontSize: 42,
      fontFamily: 'PirataOne_400Regular',
    },
   backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
  });