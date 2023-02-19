export default function authHeader() {
	const accessToken = JSON.parse(localStorage.getItem('accessToken'));
	return { 'x-access-token': `Bearer ${accessToken.value}` };
}
