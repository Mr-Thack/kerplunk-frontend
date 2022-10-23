<script lang='ts'>
	import bcrypt from 'bcryptjs'
	import {zxcvbn} from '@zxcvbn-ts/core'
	let username:string='',password:string='',saltRounds=10,rz=false
	let calc = {
		time: '',
		score: 0,
		warning: '',
		suggestions: ''
	}

	function checkCredentials() {
		const c = zxcvbn(password)
		calc = {
			time: c.crackTimesDisplay.offlineSlowHashing1e4PerSecond,
			score: c.score,
			warning: c.feedback.warning,
			suggestions: c.feedback.suggestions
		}
		document.getElementById('passwdModal').checked = true;
		if (c.score===4) {
			sendCredentials()
		}
	}

	function sendCredentials() {
		const salt = bcrypt.genSaltSync(saltRounds)
		const hash = bcrypt.hashSync(password,salt)
		fetch('WROOT/api/signup', {
			method: 'POST',
			body: JSON.stringify({username: username, hash: hash, salt:salt})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Create Accnt: success', data)
				rz = data.rz
			})
			.catch((error) => {
				console.log('Create Accnt: error!', error)
			});
	}

</script>
<div class="modal">
  <input id="passwdModal" type="checkbox" />
  <label for="passwdModal" class="overlay"></label>
  <article>
    <header>
      <h3>Sign Up Result</h3>
      <label for="passwdModal" class="close">&times;</label>
    </header>
    <section class="content">
			<h5>Results of Password "{password}":</h5>
			<p>It would take <span class='label' class:success='{calc.time==='years' || calc.time=='decades' || calc.time==='centuries'}' class:error='{calc.time!=='months' && calc.time!=='years' && calc.time!=='centuries'}'> {calc.time} </span> to guess</p>
			<p>Score (1-5): <span class='label' class:success='{calc.score===4}' class:warning='{calc.score===3}' class:error='{calc.score<3}'>{calc.score+1}</span></p>
			{#each [[calc.suggestions, 'Suggestion'], [calc.warning, 'Warning']] as o}
				{#if Array.isArray(o[0]) && o[0].length > 0}
					<p>{o[1]} Codes: {#each o[0] as s}<span class='label error'>{s}</span>, {/each}</p>
				{:else if typeof(o[0]) === 'string' && o[0] != ''}
					<p>{o[1]} Code: <span class='label warning'>{o[0]}</span></p>
				{:else}
					<p>{o[1]}s: <span class='label success'>None!</span></p>
				{/if}
			{/each}
			<p/>
			<h5>tl;dr: <span class='label' class:success='{calc.rz===true}' class:error='{calc.rz===false}'>{(calc.rz===true)?'It\'s Great!':'It Sucks!'}</span></h5>
		</section>
    <footer>
      <label for="passwdModal" class="button dangerous">
        OK
      </label>
    </footer>
  </article>
</div>
<div class='centered'>
	<article class='card'>
		<header>
			<h1>Please Fill It Out!</h1>
		</header>
		<label><input type='text' bind:value={username} placeholder='Username'></label>
		<label><input type='password' bind:value={password} placeholder='Password'></label>
		<footer>
			<!-- We have to do it twice bc Svelte can't handle one {} doing both, also we only check passwd len in 2nd bc it has priority-->
			<button on:click={checkCredentials} class:success='{username && password}' disabled='{!username || password.length < 8}'>Submit</button>
		</footer>
	</article>
</div>

