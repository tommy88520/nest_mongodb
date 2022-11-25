<template>
  <div class="scroll-icon" v-scroll-to="options">
    <UpIcon />
  </div>
</template>

<script>
import UpIcon from "./UpIcon.vue";

export default {
  name: "ScrollTop",
  components: {
    UpIcon,
  },
  data() {
    return {
      options: { element: "#header", easing: "linear" },
    };
  },
};
</script>

<style lang="scss">
.scroll-icon {
  position: fixed;
  bottom: 30px;
  right: 5%;
  border-radius: 50%;
  border: 1px solid;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background-color: #fff;
  display: flex;
  justify-content: center;
  i {
    font-size: 30px;
  }
}
</style>
