import bcrypt from 'bcryptjs'
import { goto } from '$app/navigation'
import {endpoint} from '$library/endpoint'

export default async function checkCredentials(username,password) {
		fetch(endpoint('Auth') + '?username=' + username + '&password=' + password, {
			method: 'GET'
		})
		.then((response) => response.json())
		.then((data) => {console.log(data);askVerify(data.salt,username,password)})
		.catch((error) => {
			console.log('Checkin: error!', error)
		});
}


function askVerify(salt,username,password) {
		const hash = bcrypt.hashSync(password,salt)
		fetch(endpoint('Auth') + '?username=' + username + '&hash=' + hash, {
			method: 'GET',
		})
		.then((response) => response.json())
		.then((data) => {
			console.log('Login Result from Server: ',data)
			if (data.rz) {
				goto('/home')
			} else {
				alert('Password is Wrong!')
			}
		})
		.catch((error) => {
			console.log('Login Result error!', error)
		});
}
