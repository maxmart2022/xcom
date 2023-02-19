import * as yup from 'yup';

const loginSchema = yup.object().shape({
	email: yup.string().email('invalid email').required('Email Required'),
	password: yup.string().required('Passwrod Required'),
});

export default loginSchema;
