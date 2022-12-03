<script type='ts'>
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
		<header>
			<h1>{title}</h1>
		</header>
		<label><input type='text' bind:value={username} placeholder='Username'></label>
		<label><input type='password' bind:value={password} placeholder='Password'></label>
		<footer>
			<!-- We have to do it twice bc Svelte can't handle one {} doing both, also we only check passwd.len in 2nd bc it has priority-->
			<button on:click={send} class:success='{username !=='' && password !==''}' disabled='{username==='' || password.length < 8}'>Submit</button>
		</footer>
	</article>
</div>


