<script lang="ts">
    import { endpoint } from '$library/endpoint';
    import { userDataStore } from '$library/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    var input_text = '';

    class Message {
        text: string;
        from: string;
    
        public constructor(text: string, from: string) {
            this.text = text;
            this.from = from;
        }
    }

    var messages: Message[] = [];
    
    let socket: WebSocket, 
        sendMessage: () => void,
        chatbox: HTMLUListElement;


    onMount(() => {
        chatbox = document.getElementById('chat');
        if (!$userDataStore.token) {
            alert('Sign in to a chatroom first!');
            goto('/chatrooms');
        } else {
            socket = new WebSocket(`ws://${endpoint('chats')}/${$userDataStore.cid}?token=${$userDataStore.token}`);
            socket.onmessage = function(event) {
                if (!messages.length) {
                    const given_log = event.data.split('\x1e');
                    for (const i in given_log) {
                        messages.push(new Message(given_log[i], ''));
                    }
                    messages = messages;
                } else {
                    messages.push(new Message(event.data, ''));
                    messages = messages;
                }
                chatbox.scrollTop = chatbox.scrollHeight;
                console.log(chatbox);
            }
            sendMessage = () => {
                socket.send(input_text);
                input_text = '';
            };
            const input = document.getElementById('chat_input');
            input.addEventListener('keypress', function(event) {
                console.log(event);
                if (event.key == "Enter") {
                    event.preventDefault();
                    sendMessage()
                }
            });

            // Auto Scroll to bottom
            function scrollToBottom() {
                chatbox.scrollTop = chatbox.scrollHeight;
            }
            const observer = new MutationObserver(scrollToBottom);
            const config = {childList: true};
            observer.observe(chatbox, config);
        }
    });
 
</script>
<ul id='chat'>
	{#each messages as msg}
		<li><p>{msg.text}</p></li>
    {/each}
</ul>
<div style='margin-top: 1%; margin-left: 15%'>
    <input type='text' id='chat_input' bind:value={input_text} style='width: 75%; margin-right: 1%;'>
    <button on:click={sendMessage}>Send!</button>
</div>
