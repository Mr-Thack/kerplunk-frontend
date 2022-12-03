<script type='ts'>
	import checkCredentials from '$lib/login.ts'
	import Credentials from '$components/Credentials.svelte'
	function check(username,password) {
		checkCredentials(username,password)
	}
</script>
<Credentials check={check} title='Please Sign In!'/>
