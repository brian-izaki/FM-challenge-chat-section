<template>
  <section class="chat-container">
    <div class="card-container">
      <div class="card-likes">
        <button class="btn btn-plus">
          <img class="icon" src="@/assets/images/icon-plus.svg" alt="Gostar" />
        </button>

        <div class="like-number">
          <p>0</p>
        </div>

        <button class="btn btn-minus">
          <img
            class="icon"
            src="@/assets/images/icon-minus.svg"
            alt="Náo gostar"
          />
        </button>
      </div>

      <div>
        <div class="card-header">
          <div class="flex align-center">
            <div>
              <img
                src="@/assets/images/avatars/image-amyrobson.png"
                alt="profile"
              />
            </div>

            <p>Nome Amy <span>1 month</span></p>
          </div>
          <div>
            <button class="btn-link">
              <img src="@/assets/images/icon-reply.svg" alt="reply" />
              <span> reply</span>
            </button>
          </div>
        </div>

        <div class="card-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            deleniti nisi nostrum provident assumenda? Ratione tenetur placeat
            molestiae dolores nam.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// TODO: componentizar card
// TODO: criar outros elementos da página

export default {
  name: "HomeView",
  components: {},
};
</script>

<style lang="scss" scoped>
.btn-link {
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 10px;
  color: $blue;
  border-radius: $radius;

  transition: ease-in 0.15s;
  &:hover {
    background-color: $gray_400;
  }

  &:active {
    background-color: transparent;
  }
}

.chat-container {
  margin-top: 20px;
  background-color: $white;
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.card-container {
  box-sizing: border-box;
  width: 60%;
  display: grid;
  grid-template-columns: 80px 1fr;
  padding: 10px;
  margin: 0 auto;
  background-color: $white;
  border-radius: $radius;
  min-width: 400px;
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
