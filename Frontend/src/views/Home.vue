<template>
  <div id="header" class="demo-container">
    <div class="demo-container__side-bar">
      <p class="demo-container__search-title">透過以下分類搜尋：</p>
      <div class="demo-container__side-container">
        <div
          class="demo-container__side-title"
          @click="optionStyle = !optionStyle"
        >
          <p>飯店設施</p>
          <DownIcon v-if="optionStyle" />
          <UpIcon v-else />
        </div>
        <div
          class="demo-container__check-box"
          :class="{ 'demo-container__box-open': optionStyle }"
        >
          <el-checkbox-group v-model="checkList">
            <el-checkbox
              v-for="(option, optionIndex) in sideOption"
              :key="optionIndex"
              :label="option.type"
              size="large"
              @change="selectChoice()"
            >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <div class="demo-container__detail">
      <div class="demo-container__top-bar">
        <p class="demo-container__title">找到{{ placeDetail.length }}間住宿</p>
        <router-link class="demo-container__link" to="/create"
          >新增旅館</router-link
        >
        <el-select
          v-model="barOption"
          class="demo-container__select"
          placeholder="為您精選"
          size="large"
          @change="selectChoice(barOption)"
        >
          <el-option
            v-for="item in topBarOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <PostList />
    </div>
    <ScrollTop />
  </div>
  <router-view />
</template>
<script>
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import { firstOption, topBarOption } from "../assets/data.js";
import PostList from "@/components/PostList.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import DownIcon from "@/components/DownIcon.vue";
import UpIcon from "@/components/UpIcon.vue";
export default {
  name: "App",
  components: {
    PostList,
    ScrollTop,
    DownIcon,
    UpIcon,
  },
  async setup() {
    const store = useStore();
    await store.dispatch("getHotel");

    let placeDetail = ref(store.state.hotelData);
    const barOption = ref("");
    const checkList = ref([]);
    let optionStyle = ref(true);
    let sideOption = reactive(firstOption);

    async function selectChoice(val) {
      let option;
      if (val === "asc") {
        option = {
          price: 1,
          checkList: checkList.value,
        };
      } else if (val === "desc") {
        option = {
          price: -1,
          checkList: checkList.value,
        };
      } else if (val === "all") {
        option = {
          checkList: checkList.value,
        };
      } else {
        option = {
          appraise: -1,
          checkList: checkList.value,
        };
      }
      await store.dispatch("sortHotels", option);
      placeDetail.value = store.state.hotelData;
    }

    return {
      placeDetail,
      sideOption,
      topBarOption,
      barOption,
      optionStyle,
      selectChoice,
      checkList,
    };
  },
};
</script>

<style lang="scss">
.demo-container {
  width: 80%;
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
  &__side-bar {
    border: 1px solid #dfdfdf;
    background: #fff;
    width: 200px;
    height: fit-content;
    margin: 24px 40px 0 0;
    padding: 20px;
  }
  &__search-title {
    border-bottom: 1px solid #dfdfdf;
    padding-bottom: 20px;
  }
  &__side-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  &__select {
    width: 150px;
  }
  &__check-box {
    display: flex;
    flex-direction: column;
    height: 0;
    overflow: hidden;
    transition: all 0.5;
  }
  &__box-open {
    height: fit-content;
    overflow: visible;
    transition: all 0.5;
  }
  &__detail {
    width: 80%;
    max-width: 855px;
  }
  &__title {
    font-size: 24px;
    color: #1a2b48;
    font-weight: 400;
  }
  &__top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__link {
    text-decoration: none;
    color: #1a2b48 !important;
  }
  @media (max-width: 992px) {
    justify-content: center;
    flex-direction: column;
    width: 95%;
    align-items: center;
    &__title {
      font-size: 16px;
    }
    &__side-bar {
      margin: 20px 0 0 0;
      width: 75%;
      padding: 6.5%;
    }
    &__detail {
      width: 88%;
    }
    &__side-title {
      p {
        margin: 2px 0;
        font-size: 15px;
        color: #909399;
      }
    }
  }
}
</style>
