<script lang='ts'>
    import { userDataStore } from "$library/stores";
    import { onMount, onDestroy } from "svelte";
    import { get } from "$library/endpoint";
    import { goto } from '$app/navigation';

    var uname: string, unsubscribe = () => {};

    onMount(async function () {
        unsubscribe = userDataStore.subscribe(v => uname = v.uname);
        const rez = await get('userme', { 'fields' : ['uname'] }, $userDataStore.token);
        if (rez.error) {
            alert(`HOME ERROR: ${rez.data.detail}`);
            if (rez.data.status === 401) {
                goto('/login');
            }
        } else {
            userDataStore.update(u => ({...u, 'uname': rez.data.uname}));
        }
    });

    onDestroy(unsubscribe);
</script>
{#if !uname}
    <center><h1>Sign In!</h1></center>
{:else}
    <center><h1>Welcome {uname}!</h1></center>
{/if}
