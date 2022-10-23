import { zxcvbn } from '@zxcvbn-ts/core'
import { openCred } from '../../../lib/database'

const userDB = openCred()

export const POST = async ({request, getClientAddress}) => {
	// Format: username, hash, salt
	const body = await request.json()
	let success:boolean = false
	if (body.username == "admin") {
		// This is mostly a joke
		console.log("¡User tried creating admin account at ip " + getClientAddress())
		return new Response(JSON.stringify({rz:false,time:'YOUR DEATH',score:-405,warning:
					['USER ADMIN NOT ALLOWED!','YOUR IP IS ' + getClientAddress() + '!'],
		suggestion:['TRY ANOTHER NAME!','WE\'RE NOT JOKING']}),{status: 405})
	} else {
		if (!userDB.get(body.username,1)) {
			await userDB.put(body.username, [body.salt, body.hash])
			console.log('Signed up user ' + body.username)
			success=true
		}
		return new Response(JSON.stringify({
			rz: success,
		}))
	}
}
