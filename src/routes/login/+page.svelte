<script type='ts'>
	import bcrypt from 'bcryptjs'
	import { goto } from '$app/navigation'
	let username:string='',password:string=''
	
	function askVerify(salt) {
		let hash = bcrypt.hashSync(password,salt)
		fetch('WROOT/api/login', {
			method: 'POST',
			body: JSON.stringify({username,hash})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Login Result success!',data)
				if (data.rz) {
					goto('/home')
				} else {
					alert('Password is Wrong!')
				}
			})
			.catch((error) => {
				console.log('Login Result error!', error)
			});
	}

	async function checkCredentials() {
		fetch('WROOT/api/login', {
			method: 'POST',
			body: JSON.stringify({username})
		})
			.then((response) => response.json())
			.then((data) => {console.log(data);askVerify(data.salt)})
			.catch((error) => {
				console.log('Checkin: error!', error)
			});
	}
</script>
<div class='centered'>
	<article class='card'>
		<header>
			<h1> Please Enter Your Credentials! </h1>
		</header>
		<label><input type='text' bind:value={username} placeholder='Username'></label>
		<label><input type='password' bind:value={password} placeholder='Password'></label>
		<footer>
			<!-- We have to do it twice bc Svelte can't handle one {} doing both, also we only check passwd.len in 2nd bc it has priority-->
			<button on:click={checkCredentials} class:success='{username !=='' && password !==''}' disabled='{username==='' || password.length < 8}'>Submit</button>
		</footer>
	</article>
</div>

