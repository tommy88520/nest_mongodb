<template>
  <div v-for="(data, index) in placeDetail" :key="index" class="post-list">
    <img :src="data.img" class="post-list__img" />
    <div class="post-list__detail">
      <p>{{ data.name }}</p>
      <div class="post-list__location">
        <LocationIcon />
        <p>{{ data.location }}</p>
      </div>
      <p class="post-list__desc">{{ data.desc }}</p>
    </div>
    <div class="post-list__degree">
      <div class="post-list__comments">
        <p class="post-list__text">{{ data.comments }}</p>
        <div class="post-list__fraction">{{ data.appraise }}</div>
      </div>
      <div class="post-list__price">
        <p>NT${{ digits(data.price) }}</p>
        <span>起</span>
      </div>
    </div>
  </div>
</template>

<script>
import { digits } from "../assets/number.js";
import LocationIcon from "./LocationIcon.vue";
export default {
  name: "PostList",
  props: {
    placeDetail: Array,
  },
  components: {
    LocationIcon,
  },
  setup() {
    return { digits };
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,600;1,200;1,300;1,400&display=swap");
.post-list {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #dfdfdf;
  font-family: "Poppins", sans-serif;
  &__title {
    font-size: 24px;
    color: #1a2b48;
    font-weight: 400;
  }
  &__img {
    width: 29%;
    min-width: 240px;
  }
  &__detail {
    padding: 10px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    font-family: "Poppins", sans-serif;
    p {
      margin: 10px 0;
      &:first-child {
        font-size: 16px;
        color: #1a2b50;
      }
    }
  }
  &__desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    margin: 0 !important;
  }
  &__location {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    height: 20px;
    color: #e60013;
  }
  &__degree {
    width: 24%;
    margin-top: 16px;
  }
  &__text {
    font-size: 14px;
    margin: 0 5px 0 0;
  }
  &__comments {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
  }
  &__fraction {
    width: 40px;
    height: 30px;
    line-height: 30px;
    background-color: #e60013;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    border-radius: 3px;
    text-align: center;
  }
  &__price {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: 75px;
    line-height: 27px;
    padding-right: 10px;
    p {
      margin: 0 5px 0 0;
      font-size: 18px;
    }
  }
  @media (max-width: 992px) {
    flex-direction: column;
    height: fit-content;
    &__img {
      width: 100%;
    }
    &__detail {
      width: 100%;
      padding: 0;
      max-width: none;
      p:first-child {
        padding: 5px 10px;
      }
    }
    &__degree {
      width: 100%;
    }
    &__price {
      margin-top: 13px;
    }
    &__location {
      padding: 0 10px 10px;
    }
    &__desc {
      padding: 0 10px;
    }
  }
}
</style>
