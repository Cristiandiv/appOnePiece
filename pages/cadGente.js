import { useEffect, useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import * as ImagePicker from "expo-image-picker";
import { Firebase, storage, fire, dbstore } from '../Firebase';

export default function cadGente({ navigation }) {
    const [nome, setNome] = useState(null);
    const [vivoMorto, setVivoMorto] = useState(null);  
    const [valor, setValor] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    const [img, setImg] = useState('');
    const [file, setFile] = useState([]);

    function addDiario(){
        Firebase.collection('onePiece2').add({
            nome: nome,
            vivoMorto: vivoMorto,
            valor: valor,
        });
            setNome('')
            setVivoMorto('')
            setValor('')
            Alert.alert('Cadastro', 'Recompensa cadastrada com sucesso');
            navigation.navigate('Home')
    }


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(fire, "onePiece"), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    setFile((prevFiles) => [...prevFiles, change.doc.data()]);
                }
            });
        });
        return () => unsubscribe();
    }, []);

    async function uploadImage(uri, fileType) {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, new Date().toISOString());
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
            'state_changed',
            null,
            (error) => {
                console.error(error);
            },

            async() => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                await saveRecord(fileType, downloadURL, new Date().toISOString());
                setImg("");
                });
            };
    //}// se der erro habilita //

    async function saveRecord(fileType, url, createdAt) {
        try {
            const docRef = await addDoc(collection(fire, "onePiece"), {
                fileType,
                url,
                createdAt,
            });

            
        } catch (e) {
            console.log(e);
        }
    }

    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImg(result.assets[0].uri);
            await uploadImage(result.assets[0].uri, 'img');
        }
    }

    return (
        <View style={estilo.container}>
            <Text style={estilo.titulo}>Cadastro de Recompensas</Text>
            <View style={estilo.container}>

                <View>
                    <TextInput 
                        autoCapitalize='words' 
                        style={estilo.input} 
                        placeholder="Digite o nome"
                        onChangeText={setNome} 
                        value={nome}
                    />
                    <TextInput 
                        style={estilo.input} 
                        placeholder='É vivo ou morto?' 
                        onChangeText={setVivoMorto} 
                        value={vivoMorto}
                    />
                    <TextInput 
                        style={estilo.input} 
                        placeholder='Digite o valor' 
                        onChangeText={setValor} 
                        value={valor}
                    />
                    <TouchableOpacity
                        style={estilo.btnenviar}
                        onPress={()=>{
                            addDiario();
                        }}
                    >
                        <Text style={estilo.btntxtenviar}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={pickImage}
                style={estilo.imgpick}
            >
                <Text style ={estilo.titulo}>Coloque a imagem aqui</Text>    
            </TouchableOpacity>
        </View>
    )
};

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    titulo: {
        fontSize: 35,
        marginTop: 50,
        marginBottom: 30
    },
    imgpick: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
});