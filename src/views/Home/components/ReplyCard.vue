<template>
  <div class="card-container">
    <div>
      <img :src="currentUser.image.png" alt="profile" />
    </div>

    <div class="textarea">
      <textarea
        rows="4"
        :value="value"
        @input="updateValue($event.target.value)"
      />
    </div>

    <div>
      <button class="btn fill" @click="sendClick">Reply</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReplyCard",

  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: false,
    },
  },

  methods: {
    sendClick() {
      this.$emit("send-click");
    },

    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
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
