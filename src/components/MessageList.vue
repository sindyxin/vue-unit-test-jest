<template>
    <div>
        <header class="list-header">
            <slot name="header">
                This is a default header
            </slot>
        </header>
        <ul class="list-messages">
        <!-- <Message v-for="message in messages" :key="message" :message="message" @message-clicked="handleMessageClick"></Message> -->
        <!-- slot here will equal to what's inside <List> -->
            <slot></slot> <!-- List us the slot itself and accessible via <slot>tag -->             
        </ul>
    </div>

</template>

<script>
import Message from './Message'

export default {
    name: 'MessageList',
    // props: ['message'],
    // methods: {
    //     handleMessageClick(message) {
    //         console.log(message)
    //     }
    // },
    // components: {
    //     Message
    // }    
}
</script>