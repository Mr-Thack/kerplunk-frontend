<script type='ts'>
	import { page } from '$app/stores';
	let username='';
	let password='';
	// Check is actually a function
	export let check;
	// Title, but we could also put a different prompt
	export let title;
	function send() {
		check(username,password)
	}
</script>
<div class='centered'>
	<article class='card'>
		<header style='text-align:center;'>
			<h1>Welcome</h1>
		</header>
		<label><input type='text' bind:value={username} placeholder='Username'></label>
		<label><input type='password' bind:value={password} placeholder='Password'></label>
		<footer style='display:flex;justify-content:space-between;'>
			<!-- We have to do it twice bcz Svelte can't handle one {} doing both, also we only check passwd.len in 2nd bc it has priority-->
			<button on:click={send} class:success='{username!=='' && password !==''}' disabled='{username==='' || password.length<8}'>{title}</button>
			{#if $page.url.pathname == '/login'}
				<a class='success button' href='/signup'>Sign Up Instead!</a>
			{/if}	
		</footer>
	</article>
</div>


