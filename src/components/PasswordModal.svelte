<script type='ts'>
	import { page } from '$app/stores'; 
	//calculation of the passwod's strength
	export let calc;
	export let password: String;
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
			<!-- calc.error is a string. If it's empty there is no error and it's evaluated as false. -->
			<h5>tl;dr: <span class='label' class:success='{calc.error==false}' class:error='{calc.error!=false}'>{(calc.error==false)?'The Server Accepts!':'Error: ' + calc.error}</span></h5>
		</section>
		<footer>
			<label for="passwdModal" class="button" class:dangerous='{calc.error!=false}' class:success='{calc.error==false}'>
				<!-- if false, there's actually no error, so it works backwards -->
				{#if !calc.error}
					<a href='/login'>Yay!</a>
				{/if}
				{#if calc.error}
					Try Again?
				{/if}
			</label>
    </footer>
  </article>
</div>
