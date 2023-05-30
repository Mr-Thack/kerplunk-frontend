<script lang="ts">
	import { page } from '$app/stores';
	let uname = '';
	let pwd = '';
	let email = '';
    // Check is actually a function
	export let check: (uname: string, pwd: string, email: string) => void;
	// Title, but we could also put a different prompt
	export let title: string;
  
	function send() {
		check(uname, pwd, email)
	}
	
  const condSignup = (email && uname && pwd);
  const condLogin = (email && pwd);
  var curcond = ($page.url.pathname == '/signup')? condSignup:condLogin;
</script>
<div class='centered'>
	<article class='card'>
		<header style='text-align:center;'>
			<h1>Welcome</h1>
		</header>
		<label><input type='email' bind:value={email} placeholder='Your Email'></label>
		<label><input type='password' bind:value={pwd} placeholder='Your Password'></label>
        {#if $page.url.pathname == '/signup'}
            <label><input type='text' bind:value={uname} placeholder='Your Username'></label>
        {/if}
		<footer style='display: flex; justify-content: space-between;'>
			<!-- We have to do it twice bcz Svelte can't handle one {} doing both, also we only check passwd.len in 2nd bc it has priority-->
			<button on:click={send} class:success='{curcond}' class:disabled='{!curcond}'>{title}</button>
			{#if $page.url.pathname == '/login'}
				<a class='success button' href='/signup'>Sign Up Instead!</a>
			{/if}	
		</footer>
	</article>
</div>


