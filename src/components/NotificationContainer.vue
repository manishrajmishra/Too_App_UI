<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>

</template>

<script>
import NotificationBar from "@/components/NotificationBar.vue";
import { mapState } from "vuex";
export default {
  components: {
    NotificationBar
  },
  computed: {...mapState(["notifications"])}
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 100px;
  text-align: center;
  right: 30px;
  z-index: 50;
}
</style>
