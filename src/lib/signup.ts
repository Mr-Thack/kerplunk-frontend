import bcrypt from 'bcryptjs'
import {zxcvbn} from '@zxcvbn-ts/core'
import {endpoint} from '$library/endpoint'
const saltRounds = 10;

export async function checkSendCredentials(username,password) {
	const c = checkCredentials(username,password);
	if (c.score === 4) {
		c.error = await sendCredentials(username,password);
	}
	// activate passwdModal (/routes/signup)
	document.getElementById('passwdModal').checked = true;
	return c;
}

function checkCredentials(username,password) {
	const c = zxcvbn(password)
	// we only need to send the important information back
	const calc = {
		time: c.crackTimesDisplay.offlineSlowHashing1e4PerSecond,
		score: c.score,
		warning: c.feedback.warning,
		suggestions: c.feedback.suggestions,
		error: ''
	}
	return calc;
}

export async function sendCredentials(username,password) {
	const salt = bcrypt.genSaltSync(saltRounds)
	const hash = bcrypt.hashSync(password,salt)
	let error = ''
	await fetch(endpoint('Auth'), {
		method: 'POST',
		body: JSON.stringify({username: username, hash: hash, salt:salt})
	})
	.then((res) => res.json())
	.then((data) => {
		console.log('Create Accnt: success', data)
		error = data.error
	})
	.catch((error) => {
		console.log('Create Accnt: error!', error)
	});
	return error;
}
