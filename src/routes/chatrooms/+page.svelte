<script lang='ts'>
    import { get, post, patch } from '$library/endpoint';
	import { userDataStore } from '$library/stores';
    import { onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation';

    async function updateChats() {
        chatrooms = (await get('chats')).data.chatrooms.split(' ').filter((name: string) => name.length != 0);
    };


    var chatrooms: string[] = [];
    let updateInterval: NodeJS.Timeout;
    onMount( async function() {
        updateChats();
        updateInterval = setInterval(async function() {
            await updateChats();
        }, 5000);
    });

    async function join(room: string) {
        if (!$userDataStore.token) {
            console.log($userDataStore);
            alert('Login First!!');
        } else {
            const r = await patch('chats', {}, {'name': room}, $userDataStore.token);
            if (r.error) {
                alert(`JOIN ERROR: ${r.data}`);
            } else {
                $userDataStore.cid = r.data.cid;
                goto('/chat');
            }
        }
    }

    const data = {
        name: '',
        pwd: '',
        public: false,
        temp: true
    }
    async function makeRoom() {
        if (!data.name) {
            alert('Name is Required!!!');
        } else {
            const r = await post('chats', data, $userDataStore.token);
            console.log(r)
            if (r.error) {
                alert(`ERROR MAKING: ${r.data}`);
            } else {
                alert('All\'s well! Should show up soon!')
            }
        }
    }   
    onDestroy(() => {
        clearInterval(updateInterval);
    });
</script>

<center><label for='openRoom' class='button'>Make Your Own!</label></center>
<center><h1>Chatrooms:</h1></center>

{#if chatrooms.length}
    {#each chatrooms as chatroom}
        <center>
            <button style='margin-top: 3em; width: 25%;' on:click={() => join(chatroom)}>Join {chatroom}</button>
        </center>
    {/each}
{:else}
    <center><h2>There aren't any yet! Make one!</h2></center>
{/if}

<div class='modal'>
    <input id='openRoom' type='checkbox' />
    <label for='openRoom' class='overlay' />
    <article>
        <header>
            <center><h3>Create Chatroom</h3></center>
            <label for='openRoom' class='close'>&times</label>
        </header>
        <section class='content'>
            <input type='text' bind:value={data.name} placeholder='Chatroom name'>
            <input type='password' bind:value={data.pwd} placeholder='Chatroom password'>
            <label>
                <input type='checkbox' bind:checked={data.public}>
                <center><span class='toggle button'>
                    {#if !data.public}
                        Make Public
                    {:else}
                        Make Private
                    {/if}
                </span></center>
            </label>
            <input type=checkbox bind:checked={data.temp}>
        </section>
        <footer>
        <label for='openRoom' style='float: right' class='button' on:click|preventDefault={makeRoom}>
            Create!
        </label>
</div>
