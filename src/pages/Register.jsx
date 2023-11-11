import React from "react";
import { Formik, useField } from 'formik'
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Button, ScrollView } from "react-native";
import StyledTextInput from '../components/StyledTextInput.jsx'
import { loginValidationSchema } from "../ValidationSchemas/login.js";
import StyledText from "../components/StyledText.jsx";
import { Picker } from '@react-native-picker/picker';


const fondo = require('../../public/back-log.jpg')

const initialValues = {
    identificacion: '',
    password: ''
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 20,
        marginTop: -5
    },
    container: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',

    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        opacity: 0.7
    },
    cardForm: {
        width: 350,
        height: 880,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    input: {
        width: 280,
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white'
    },
    textBlue: {
        fontSize: 16,
        color: '#FEFEFE',
        backgroundColor: '#2874A6',
        height: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        borderRadius: 5,
        margin: 5
    },
    textGreen: {
        fontSize: 16,
        color: '#FEFEFE',
        backgroundColor: '#239B56',
        height: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        borderRadius: 5,
        marginTop: 20
    }
})

const FormikSelectIdentification =({name, ...props}) => {
    const [field, meta, helpers] = useField(name)
    return(
        <>
            <Picker 
                selectedValue={field.value}
                onValueChange={(value) => helpers.setValue(value)}
                {...props}
            >
                <Picker.Item label="Selecciona el tipo de identificación" value='' />
                <Picker.Item label="Cédula de Ciudadanía" value='CC' />
                <Picker.Item label="Tarjeta de Identidad" value='TI' />
                <Picker.Item label="Pasaporte" value='PA' />
            </Picker>
            {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </>
    )
}

const FormikinputValue = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    return (
        <>
            <StyledTextInput error={meta.error} value={field.value} onChangeText={value => helpers.setValue(value)} {...props} />
            {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </>
    )
}

const selectFile = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size
        );
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
        } else {
            throw err;
        }
    }
};

export default function RegisterPage() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <ImageBackground source={fondo} style={styles.image}>
                    <View style={styles.cardForm}>
                        <Text style={styles.title}>Registrate en CPDC</Text>
                        <Formik validationSchema={loginValidationSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
                            {({ handleSubmit, values }) => {
                                return (
                                    <View style={styles.form}>
                                        <FormikinputValue style={styles.input} placeholder="Nombre" name='Nombre' />
                                        <FormikinputValue style={styles.input} placeholder="Apellido" name='Apellido' />
                                        <FormikSelectIdentification name="tipoIdentificacion" />
                                        <FormikinputValue style={styles.input} placeholder="Identificación" name='identificacion' keyboardType="numeric" />
                                        <FormikinputValue style={styles.input} placeholder="Telefono de contacto" name='telefonoContacto' keyboardType="numeric" />
                                        <FormikinputValue style={styles.input} placeholder="Telefono de emergencia" name='telefonoEmergencia' keyboardType="numeric" />
                                        <FormikinputValue style={styles.input} placeholder="Correo Electronico" name='correo' />
                                        <Picker selectedValue={values.usuarioType} onValueChange={(itemValue) => console.log("Tipo de usuario: ", itemValue)} style={{ marginVertical: 15, height: 30 }}>
                                            <Picker.Item label="Selecciona el tipo de usuario" value='' />
                                            <Picker.Item label="Paciente" value='Paciente' />
                                            <Picker.Item label="Familiar" value='Familiar' />
                                            <Picker.Item label="Especialista" value='Especialista' />
                                            <Picker.Item label="Administrador" value='Admin' />
                                        </Picker>
                                        <Text style={{ textAlign: 'center', marginVertical: 10 }}>En caso de que su usuario seleccionado sea PACIENTE utilice el siguiente campo para subir su historia medica</Text>
                                        <Button title="Seleccionar archivo" onPress={selectFile} />
                                        <Text style={{ textAlign: 'center', marginVertical: 10 }}>Debe seleccionar un foto para su perfil</Text>
                                        <Button title="Seleccionar imagen" onPress={selectFile} />
                                        <TouchableOpacity onPress={handleSubmit}><Text style={styles.textGreen}>REGISTRARSE</Text></TouchableOpacity>
                                    </View>
                                )
                            }}
                        </Formik>
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}