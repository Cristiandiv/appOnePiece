import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { fire } from '../Firebase';

export default function EditGente({ navigation, route }) {
    const { id, nome: initialNome, vivoMorto: initialVivoMorto, valor: initialValor, local: initialImg } = route.params;

    const [nome, setNome] = useState(initialNome);
    const [vivoMorto, setVivoMorto] = useState(initialVivoMorto);
    const [valor, setValor] = useState(initialValor);
    const [img, setImg] = useState(initialImg);

    async function alterarTextos(id, nome, vivoMorto, valor) {
        try {
            const docRef = doc(fire, "textos", id);
            await updateDoc(docRef, {
                nome: nome,
                vivoMorto: vivoMorto,
                valor: valor,
            });
            Alert.alert("Aviso", "Texto alterado com sucesso.");
            navigation.navigate("verDados");
        } catch (error) {
            console.error("Erro ao alterar o diário: ", error);
            Alert.alert("Erro", "Erro ao alterar o diário.");
        }
    }

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}>Alterar dados</Text>
            </View>
            <View>
                <TextInput
                    autoCapitalize='words'
                    style={estilo.input}
                    placeholder="Digite o título"
                    onChangeText={setNome}
                    value={nome}
                />
                <TextInput
                    style={estilo.input}
                    placeholder='Digite o estado (vivo ou morto)'
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
                    onPress={() => {
                        alterarTextos(id, nome, vivoMorto, valor);
                    }}
                    style={estilo.btnenviar}
                >
                    <Text style={estilo.btntxtenviar}>Alterar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#9ac234',
        paddingHorizontal: 20,
        paddingVertical: 10,
        fontSize: 15,
        borderRadius: 10
    },
    btnenviar: {
        marginTop: 20
    },
    btntxtenviar: {
        fontSize: 25
    },
    titulo: {
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center'
    },
});