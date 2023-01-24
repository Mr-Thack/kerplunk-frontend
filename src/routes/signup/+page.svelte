<script lang='ts'>
	import { checkAndSendCredentials } from '$lib/signup'
	import PasswordModal from '$components/PasswordModal.svelte'
	import Credentials from '$components/Credentials.svelte'
	// We just need to initialize them to avoid errors
	let password='', calc = {
		time: '',
		score: 0,
		suggestions: [],
		warnings: [],
		error: ''
	}

	async function check(username: string, p: string, email: string)
	{
        // We pass this to Credentials (at bottom) To check with
		password=p;  // we need to set our current password to password returned
		calc = await checkAndSendCredentials(username, password, email);
        console.log(calc);
	}

</script>
<PasswordModal calc={calc} password={password} />
<Credentials check={check} title='Sign Up!'/>  
