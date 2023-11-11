import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    identificacion: yup
        .string()
        .matches(/^\d+$/, 'La identificación debe ser numerica')
        .min(4, 'La identificación es muy corta')
        .max(12, 'La identificación es muy larga')
        .required('Numero de identidad es requerido'),
    
    password: yup
        .string()
        .min(5, 'Password demasiado corta')
        .max(20, 'Password muy larga')
        .required('Password es requerida')
})