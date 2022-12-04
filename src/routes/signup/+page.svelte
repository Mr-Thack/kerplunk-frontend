<script lang='ts'>
	import { checkSendCredentials } from '$lib/signup'
	import PasswordModal from '$components/PasswordModal.svelte'
	import Credentials from '$components/Credentials.svelte'
	// We just need to initialize them to avoid errors
	let password='', calc = {
		time: '',
		score:0,
		suggestions:'',
		warnings:'',
		error:''
	}
	
	async function check(username,p)
	{
		//set "global" `password` to local `p` 
		password=p;
		calc = await checkSendCredentials(username,password)
	}

</script>
<PasswordModal calc={calc} password={password} />
<Credentials check={check} title='Sign Up!'/>  
