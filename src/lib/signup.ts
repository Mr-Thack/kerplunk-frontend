import {zxcvbn} from '@zxcvbn-ts/core'
import {post} from '$library/endpoint'

export async function checkAndSendCredentials(username: string,
                                              password: string,
                                              email: string) {
	// This will both check (locally) and send the credentials to the server
    const c = checkCredentials(password);
	if (c.score === 4) {
		const rez = await post('signup',
                                 {'uname': username,
                                  'pwd': password,
                                  'email': email});
        if (!rez.error) {
            c.error = '';
        } else {
            c.error = rez.data.detail;
        }
	}
	// activate passwdModal (/routes/signup)
	document.getElementById('passwdModal').checked = true;
	return c;
}

function checkCredentials(password: string) {
	const c = zxcvbn(password)
	// we only need to send the important information back
	const calc = {
		time: c.crackTimesDisplay.offlineSlowHashing1e4PerSecond,
		score: c.score,
		suggestions: c.feedback.suggestions,
        warnings: c.feedback.warning,
		error: 'Password Not Secure'
	}
	return calc;
}
