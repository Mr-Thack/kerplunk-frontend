<script>
let messages = [{text:'hello',from:'user1',time:'2:39'},{text:'hi!',from:'user2',time:'2:40'}];
</script>
<chatbox>
	<ul id='chat'>
	{#each messages as msg}
		<li><p>{msg.text}</p></li>
	{/each}
	</ul>
</chatbox>
