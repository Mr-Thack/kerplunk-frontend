<script lang="ts">
    import { endpoint } from '$library/endpoint';
    import { userDataStore } from '$library/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { falert } from '$library/simpleAlert';
	

    let chatbox: HTMLElement, chatInput: HTMLElement;
    var inputText = '';

    function scrollChatBottom(behavior?: ScrollBehavior): void {
	      chatbox.scrollTo({ top: chatbox.scrollHeight, behavior });
    }
		  

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
        sendMessage: () => void;


    onMount(() => {
        if (!$userDataStore.token) {
            falert('Sign in to a chatroom first!', () => {
                goto('/chatrooms')
            });
        } else {
            console.log(endpoint('chats'));
            socket = new WebSocket(`ws://${endpoint('chats')}/${$userDataStore.cid}?token=${$userDataStore.token}`);
            socket.onmessage = function(event) {
                if (!messages.length) {
                    const given_log = event.data.split('\x1e');
                    for (const i in given_log) {
                        messages.push(new Message(given_log[i], ''));
                    }
                    messages = messages;
                } else {
                    messages = [...messages, new Message(event.data, '')]
                    setTimeout(() => scrollChatBottom('smooth'), 0);
                }
            }
            sendMessage = () => {
                socket.send(inputText);
                inputText = '';
            };
            chatInput.addEventListener('keypress', function(event) {
                console.log(event);
                if (event.key == "Enter") {
                    event.preventDefault();
                    sendMessage()
                }
            });
            // Auto Scroll to bottom
            /*function scrollToBottom() {
                chatbox.scrollTop = chatbox.scrollHeight;
            }
            const observer = new MutationObserver(scrollToBottom);
            const config = {childList: true};
            observer.observe(chatbox, config);
            */
        }
    });
 
</script>

<section bind:this={chatbox}
    class="w-full max-h-[600px] p-4 overflow-y-auto space-y-4"
    class:placeholder='{!messages.length}'
    class:animate-pulse='{!messages.length}'
    >
    
    {#each messages as msg}
        <div class="grid grid-cols-[auto_1fr] gap-2">
            <!-- We can add avatars later.... -->
            <div class="card p-4 variant-soft rounded-tl-none space-y-2">
                <header class="flex justify-between items-center">
                    <p class="font-bold">{msg.from}</p>
                    <!-- add timestamp here -->
                </header>
                <p>{msg.text}</p>
            </div>
        </div>
    {/each}
</section>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token">
    <textarea
        bind:this={chatInput}
        bind:value={inputText}
        class="bg-transparent border-0 ring-0"
        name="prompt"
        placeholder="Message Here..."
        rows="1"
    />
    <button class="variant-filled-primary" on:click={sendMessage}>Send!</button>
</div>
<!--
<div style='margin-top: 1%; margin-left: 15%'>
    <input type='text' id='chat_input' bind:value={input_text} style='width: 75%; margin-right: 1%;'>
    <button on:click={sendMessage}>Send!</button>
</div>
-->