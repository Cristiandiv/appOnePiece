import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import { useFonts, PirataOne_400Regular } from '@expo-google-fonts/pirata-one';
import { DellaRespira_400Regular } from '@expo-google-fonts/della-respira';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fire } from '../Firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function VerGente() {
  const [textos, setTextos] = useState([]);
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const textosSnapshot = await getDocs(collection(fire, 'textos'));
          const imgSnapshot = await getDocs(collection(fire, 'img'));
          
          const textosData = textosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          const imgData = imgSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          setTextos(textosData);
          setImagens(imgData);
      };

      fetchData();
  }, []);

  let [fontsLoaded, fontError] = useFonts({
      PirataOne_400Regular, DellaRespira_400Regular
  });

  if (!fontsLoaded && !fontError) {
      return null;
  }

  async function deletarTexto(id){

    Firebase.collection("textos").doc(id).delete();

    Alert.alert("O texto foi deletado.");
  }

  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.containerTitulo}>
              <Image
                  source={require('../assets/op.png')}
                  style={styles.principal}
              />
          </View>
              <View style={styles.containerTexto}>
                  <Text style={styles.titulo}>
                      {/* Título aqui */}
                  </Text>
              </View>

              <View style={{flex: 1, width: '70%'}}>

              <Text style={styles.subtitulo}>Textos</Text>
              <FlatList
                  data={textos}
                  style={{}}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                      <View style={styles.item}>
                          <Text>{item.nome}</Text>
                          <Text>{item.vivoMorto}</Text>
                          <Text>{item.valor}</Text>

                          <View>
                            <TouchableOpacity onPress={()=>{deletarTexto(item.id)}}>
                            <MaterialCommunityIcons name="delete-empty" size={70} color="red" />
                            </TouchableOpacity>
                            </View>
                      </View>


                  )}
              />
              

              <Text style={styles.subtitulo}>Imagens</Text>
              <FlatList
                  data={imagens}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                      <View style={styles.item}>
                          <Image source={{ uri: item.url }} style={styles.image} />
                      </View>
                  )}
              />

              </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center'
  },
  containerTitulo: {
      alignItems: 'center',
  },
  principal: {
      width: 310,
      height: 110,
      borderRadius: 10,
  },
  containerTexto: {
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
  subtitulo: {
      fontSize: 24,
      fontFamily: 'DellaRespira_400Regular',
      marginVertical: 20,
      textAlign: 'center',
  },
  item: {
      marginBottom: 20,
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 2,
  },
  image: {
      resizeMode: 'stretch',
      height: 200,
      borderRadius: 10,
  },
});