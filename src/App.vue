<template>
  <div id="app">
    <MessageList :messages="messages">
      <header slot="header">
        Awesome header
      </header>
      <Message v-for="message in messages" :key="message" :message="message" @message-clicked="handleMessageClick"></Message>
    </MessageList>
    <Form></Form>
  </div>
</template>

<script>
import MessageList from "@/components/MessageList";
import Message from "@/components/Message";
import Form from "@/components/Form";

export default {
  name: "app",
  props:['message'],
  data: () => ({ messages: ["Hey John", "Howdy Paco"] }),
  components: {
    MessageList,
    Message,
    Form
  },
  methods: {
    handleMessageClick(message) {
      console.log(message);
    }
  }
};
</script>


