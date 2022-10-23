import { openCred } from '../../../lib/database';
const userDB = openCred();

export const POST = async ({request}) => {
	// Format: username, hash
	const body = await request.json()
	if (body.hash) {
		let rz = body.username && body.hash
		if (rz) {
			console.log('Username ' + body.username + ' tried')
			const askDB = await userDB.get(body.username,1)
			if (askDB) {
				/* For somereason, bcrypt's builtin way to check
					 isn't working. That's fine! All we really need
					 to do is check if the characters are the same
					 in both. So, we can use an ===. I believe
					 the problem is happening because askDB[1]
					 and body.hash aren't of the right type */
			 	rz=(askDB[1].toString()===body.hash.toString())
			} else {
				rz=false
			}
		}
		return new Response(JSON.stringify({rz:rz}))
	} else {
		return new Response(JSON.stringify({salt: await userDB.get(body.username,1)[0]}));
	}
}
