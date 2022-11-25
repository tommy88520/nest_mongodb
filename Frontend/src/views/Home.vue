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
          <el-checkbox
            v-for="(option, optionIndex) in sideOption"
            :key="optionIndex"
            v-model="option.value"
            :label="option.label"
            size="large"
            @change="selectRequire(option.value, optionIndex)"
          />
        </div>
      </div>
    </div>
    <div class="demo-container__detail">
      <div class="demo-container__top-bar">
        <p class="demo-container__title">找到{{ placeDetail.length }}間住宿</p>
        <router-link to="/create">About</router-link>
        <el-select
          v-model="barOption"
          class="demo-container__select"
          placeholder="為您精選"
          size="large"
          @change="selectChoice"
        >
          <el-option
            v-for="item in topBarOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <PostList :placeDetail="placeDetail" />
    </div>
    <ScrollTop />
  </div>
  <router-view />
</template>
<script>
import { useStore } from "vuex";
import { ref, reactive, onMounted } from "vue";
import { roomData, firstOption, topBarOption } from "../assets/data.js";
import PostList from "@/components/PostList.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import DownIcon from "@/components/DownIcon.vue";
import UpIcon from "@/components/UpIcon.vue";
import _ from "lodash";
export default {
  name: "App",
  components: {
    PostList,
    ScrollTop,
    DownIcon,
    UpIcon,
  },
  setup() {
    const store = useStore();
    const barOption = ref("");
    const originData = _.cloneDeep(roomData);
    let optionStyle = ref(true);
    let placeDetail = ref(roomData);
    let sideOption = reactive(firstOption);
    let optional = reactive([]);
    onMounted(() => {
      store.dispatch("getHotel");
    });
    function selectRequire(v, i) {
      sideOption[i].value = v;
      optional = sideOption.reduce((acr, cur) => {
        if (cur.value) {
          acr.push(cur.type);
        }
        return acr;
      }, []);
      placeDetail.value = originData.reduce((acc, cur) => {
        const isFounded = optional.every((a) => cur.roomDetail.includes(a));
        if (isFounded) {
          acc.push(cur);
        }
        return acc;
      }, []);
      selectChoice();
    }
    function selectChoice() {
      const action = barOption.value;
      switch (action) {
        case "all": {
          placeDetail.value = _.shuffle(placeDetail.value);
          break;
        }
        case "asc": {
          placeDetail.value = placeDetail.value.sort(function (a, b) {
            return a.price > b.price ? 1 : -1;
          });
          break;
        }
        case "desc": {
          placeDetail.value = placeDetail.value.sort(function (a, b) {
            return a.price < b.price ? 1 : -1;
          });
          break;
        }
        case "star": {
          placeDetail.value = placeDetail.value.sort(function (a, b) {
            return Number(a.appraise) < Number(b.appraise) ? 1 : -1;
          });
          break;
        }
        default: {
          break;
        }
      }
    }
    return {
      placeDetail,
      sideOption,
      topBarOption,
      selectRequire,
      selectChoice,
      barOption,
      optional,
      optionStyle,
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
