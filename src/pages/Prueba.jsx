import React from "react";
import { Formik, useField } from 'formik'
import { Button, StyleSheet, View, ScrollView } from "react-native";
import StyledTextInput from '../components/StyledTextInput.jsx'
import { registerValidationSchema } from "../ValidationSchemas/register.js";
import StyledText from "../components/StyledText.jsx";
import { Picker } from '@react-native-picker/picker';
import { pick, types } from 'react-native-document-picker';

const initialValues = {
    nombre: '',
    apellido: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    telefonoContacto: '',
    telefonoEmergencia: '',
    correo: '',
    tipoUsuario: ''
}

const styles = StyleSheet.create({
    form: {
        margin: 23,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 20,
        marginTop: -5
    }
})

const FormikSelectIdentification = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    return (
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

const FormikSelectUsuario = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    return (
        <>
            <Picker
                selectedValue={field.value}
                onValueChange={(value) => helpers.setValue(value)}
                {...props}
            >
                <Picker.Item label="Selecciona el tipo de usuario" value='' />
                <Picker.Item label="Paciente" value='Paciente' />
                <Picker.Item label="Familiar" value='Familiar' />
                <Picker.Item label="Especialista" value='Especialista' />
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

const selectDoc = async () => {
    try {
      const doc = await pick({
        type: [types.pdf, types.images],
      });
      console.log(doc);
    } catch (err) {
      if (isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.log(err);
      }
    }
  };

export default function Prueba() {
    return (
        <ScrollView>
            <Formik validationSchema={registerValidationSchema} initialValues={initialValues} onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => {
                    return (
                        <View style={styles.form}>
                            <FormikinputValue placeholder="Nombre" name='nombre' />
                            <FormikinputValue placeholder="Apellido" name='apellido' />
                            <FormikSelectIdentification name="tipoIdentificacion" />
                            <FormikinputValue placeholder="Numero de Identificacion" name='numeroIdentificacion' keyboardType="numeric" />
                            <FormikinputValue placeholder="Telefono de Contacto" name='telefonoContacto' keyboardType="numeric" />
                            <FormikinputValue placeholder="Telefono de Emergencia" name='telefonoEmergencia' keyboardType="numeric" />
                            <FormikinputValue placeholder="Correo electronico" name='correo' />
                            <FormikSelectUsuario name="tipoUsuario" />
                            <FilePicker onChange={(selectedFile) => setFieldValue('selectedFile', selectedFile)} error={errors.selectedFile} />
                            <Button onPress={handleSubmit} title="Log In" />
                        </View>
                    )
                }}
            </Formik>
        </ScrollView>
    )
}