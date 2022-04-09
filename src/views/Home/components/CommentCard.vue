<template>
  <card-container>
    <template #score>
      <div class="card-likes">
        <button class="btn btn-plus" @click="$emit('likeClick')">
          <img class="icon" src="@/assets/images/icon-plus.svg" alt="Gostar" />
        </button>

        <div class="like-number">
          <p>0</p>
        </div>

        <button class="btn btn-minus" @click="$emit('unlikeClick')">
          <img
            class="icon"
            src="@/assets/images/icon-minus.svg"
            alt="Náo gostar"
          />
        </button>
      </div>
    </template>

    <template #user>
      <div>
        <img src="@/assets/images/avatars/image-amyrobson.png" alt="profile" />
      </div>

      <p>Nome Amy <span>1 month</span></p>
    </template>

    <template #reply>
      <button class="btn link">
        <img src="@/assets/images/icon-reply.svg" alt="reply" />
        <span> reply</span>
      </button>
    </template>

    <template #content>
      <div class="card-content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          deleniti nisi nostrum provident assumenda? Ratione tenetur placeat
          molestiae dolores nam.
        </p>
      </div>
    </template>
  </card-container>
</template>

<script>
import CardContainer from "@/layout/CardContainer.vue";
export default {
  name: "CommentCard",

  components: {
    CardContainer,
  },

  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  line-height: 1.5em;
}

.card-likes {
  margin: auto auto;
  width: 40px;

  .btn {
    height: 40px;
    border: none;
    background-color: $gray_400;
    cursor: pointer;

    transition: ease 0.1s;
    &:hover {
      filter: brightness(0.9);
      & > img {
        filter: brightness(1.75);
      }
    }

    &:active {
      filter: brightness(1);
    }
  }

  .like-number {
    background-color: $gray_400;

    p {
      padding: 5px;
      text-align: center;
    }
  }

  .btn-plus {
    border-top-left-radius: $radius;
    border-top-right-radius: $radius;
    width: 100%;
  }

  .btn-minus {
    border-bottom-left-radius: $radius;
    border-bottom-right-radius: $radius;
    width: 100%;
  }
}
</style>
