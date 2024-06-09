import { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import * as ImagePicker from "expo-image-picker";
import { storage, fire } from '../Firebase';

export default function CadGente({ navigation }) {
    const [nome, setNome] = useState('');
    const [vivoMorto, setVivoMorto] = useState('');  
    const [valor, setValor] = useState('');

    const [img, setImg] = useState('');
    const [file, setFile] = useState([]);

    async function addDiario(){
        try{
        await addDoc(collection(fire, 'textos'),{
            nome: nome,
            vivoMorto: vivoMorto,
            valor: valor,
        });
            Alert.alert('Cadastro', 'Recompensa cadastrada com sucesso');
            navigation.navigate('Homepage')
    } catch (error){
        console.error("Error adding document: ", error);
            Alert.alert('Erro', 'Não foi possível cadastrar a recompensa');
    }
}


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(fire, "img"), (snapshot) => {
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
            const docRef = await addDoc(collection(fire, "img"), {
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