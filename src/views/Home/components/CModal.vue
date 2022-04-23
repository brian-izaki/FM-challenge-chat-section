<template>
  <transition>
    <div class="overlay">
      <div class="modal-container">
        <div class="header">
          <slot name="header" />
        </div>

        <div class="content">
          <slot name="content" />
        </div>

        <div class="footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CModal",
};
</script>

<style lang="scss" scoped>
.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  @include flex-centralized;
}

.modal-container {
  position: relative;
  width: 300px;
  max-height: 300px;
  background: $white;
  padding: 20px;
  border-radius: $radius;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
}

.footer {
  display: flex;
  gap: 20px;
}

.v-enter-active,
.v-leave-active {
  transition: 0.5s ease;
}

// special classes from Vue transition component
.v-enter {
  transform: translateY(100vh);
}

.v-enter-to {
  transform: translateY(0);
}

.v-leave-to {
  transform: translateY(-100vh);
}
</style>
