<template>
  <div class="card-container">
    <div>
      <!-- <img
        src="../../../../../public/images/avatars/image-juliusomo.png"
        alt="profile"
      /> -->
    </div>

    <div class="textarea">
      <textarea rows="4" />
    </div>

    <div>
      <button class="btn fill">Reply</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-container {
  @include card-container;

  display: flex;
  justify-content: space-between;
  gap: 10px;

  .textarea {
    flex: 1;
  }
}
</style>
