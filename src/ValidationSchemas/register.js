import * as yup from 'yup'

export const registerValidationSchema = yup.object().shape({
    nombre: yup
        .string()
        .required("El nombre es requerido"),
    apellido: yup
        .string()
        .required("El apellido es requerido"),
    tipoIdentificacion: yup
        .string()
        .required("El tipo de identificación es requerido"),
    numeroIdentificacion: yup
        .string()
        .matches(/^\d+$/, 'La identificación debe ser numerica')
        .min(4, 'La identificación es muy corta')
        .max(12, 'La identificación es muy larga')
        .required('Numero de identidad es requerido'),
    telefonoContacto: yup
        .string()
        .matches(/^[0-9]{10}$/, 'El telefono de contacto deber ser numerico y de 10 digitos')
        .required('El telefono de contacto es requerido'),
    telefonoEmergencia: yup
        .string()
        .matches(/^[0-9]{10}$/, 'El telefono de contacto deber ser numerico y de 10 digitos')
        .required('El telefono de contacto es requerido'),
    correo: yup
        .string()
        .email('Correo invalido')
        .required('el correo es requerido'),
    tipoUsuario: yup
        .string()
        .required("El tipo de usuario es requerido"),
})