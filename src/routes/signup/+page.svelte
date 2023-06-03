<script lang="ts">
	import { checkAndSendCredentials } from '$lib/signup'
	import Credentials from '$components/Credentials.svelte'
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	
	// We just need to initialize them to avoid errors
	let password='', calc = {
		time: '',
		score: 0,
		suggestions: [],
		warnings: [],
		error: ''
	}

	const passwordModal: ModalSettings = {
		type: 'alert',
		title: 'Sign Up Result',
		body: ''
	}


	async function check(username: string, p: string, email: string)
	{
    // We pass this to Credentials (at bottom) To check with
		password=p;  // we need to set our current password to password returned
		calc = await checkAndSendCredentials(username, password, email);

		// After parsing the results, open the modal to show results to the user
		passwordModal.body = "Results (1-5): " + calc.score;
		modalStore.trigger(passwordModal);	
	}

</script>
<Credentials check={check} title='Sign Up!'/> 
