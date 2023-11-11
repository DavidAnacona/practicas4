import React from "react";
import { Formik, useField } from 'formik'
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import StyledTextInput from '../components/StyledTextInput.jsx'
import { loginValidationSchema } from "../ValidationSchemas/login.js";
import StyledText from "../components/StyledText.jsx";

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
        height: '100%'
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
        width: 320,
        height: 380,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginTop: -100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30
    },
    input: {
        width: 250,
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
        margin: 5
    }
})

const FormikinputValue = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    return (
        <>
            <StyledTextInput error={meta.error} value={field.value} onChangeText={value => helpers.setValue(value)} {...props} />
            {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
        </>
    )
}

export default function LogInPage() {
    return (
        <View style={styles.container}>
            <ImageBackground source={fondo} style={styles.image}>
                <View style={styles.cardForm}>
                    <Text style={styles.title}>Bienvenido a CPDC</Text>
                    <Formik validationSchema={loginValidationSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
                        {({ handleSubmit }) => {
                            return (
                                <View style={styles.form}>
                                    <FormikinputValue style={styles.input} placeholder="Identificación" name='identificacion' keyboardType="numeric"/>
                                    <FormikinputValue style={styles.input} placeholder="Password" name='password' secureTextEntry />
                                    <TouchableOpacity style={styles.submit} onPress={handleSubmit}><Text style={styles.textBlue}>INICIAR SESIÓN</Text></TouchableOpacity>
                                    <TouchableOpacity onPress={handleSubmit}><Text style={styles.textGreen}>REGISTRARSE</Text></TouchableOpacity>
                                </View>
                            )
                        }}
                    </Formik>
                </View>
            </ImageBackground>
        </View>
    )
}