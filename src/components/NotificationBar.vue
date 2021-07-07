<template>
  <v-alert :color="notificationTypeClass">
    {{ notification.message }}
  </v-alert>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  computed: {
    notificationTypeClass() {
      return `${this.notification.type}`;
    }
  },
  methods: {...mapActions(["remove"])},
  mounted() {
    console.log(this.notification)
    this.timeout = setTimeout(() => this.remove(this.notification), 3000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped></style>
