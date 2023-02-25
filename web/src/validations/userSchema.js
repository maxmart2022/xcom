import * as yup from 'yup';

const userSchema = yup.object().shape({
	email: yup.string().email('Invalid Email').required('Email Required'),
	password: yup.string(),
});

export default userSchema;
