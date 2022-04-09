<template>
  <div class="card-container">
    <div class="score">
      <slot name="score" />
    </div>

    <div class="user">
      <slot name="user" />
    </div>

    <div class="reply">
      <slot name="reply" />
    </div>

    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card-container {
  @include card-container;

  display: grid;
  grid-template-columns: 70px 1fr 100px;
  grid-template-rows: 1fr auto auto;

  .score {
    grid-column: 1/2;
    grid-row: 1/4;

    @include flex-centralized;
  }

  .user {
    grid-column: 2/3;
    grid-row: 1/2;
    margin-bottom: 10px;

    display: flex;
    align-items: center;
    gap: 10px;
  }

  .reply {
    grid-column: 3/4;
    grid-row: 1/2;

    @include flex-centralized;
  }

  .content {
    grid-column: 2/4;
    grid-row: 2/4;
  }
}
</style>
