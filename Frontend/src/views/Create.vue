<template>
  <div class="create-hotel">
    <div class="create-hotel__form">
      <div class="create-hotel__title">
        <h2>新增旅館</h2>
        <router-link class="create-hotel__link" to="/"
          >回本頁</router-link>
      </div>
      <el-form
        ref="ruleFormRef"
        :label-position="labelPosition"
        label-width="100px"
        :model="ruleForm"
        :rules="rules"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="Location" prop="location">
          <el-input v-model="ruleForm.location" />
        </el-form-item>
        <el-form-item label="RoomDetail" prop="roomDetail">
          <el-checkbox
            label
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
            >Check all</el-checkbox
          >
          <el-checkbox-group
            v-model="ruleForm.roomDetail"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Desc" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input v-model="ruleForm.price" type="number"/>
        </el-form-item>
        <el-form-item label="Comments" prop="comments">
          <el-input v-model="ruleForm.comments" />
        </el-form-item>
        <el-form-item label="Appraise" prop="appraise">
          <el-input v-model="ruleForm.appraise" type="number"/>
        </el-form-item>
        <el-form-item label="IMG url" prop="img">
          <el-input v-model="ruleForm.img" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElNotification } from 'element-plus'
export default {
  name: "Create-hotel",
  setup() {
    const store = useStore();
    const labelPosition = ref("left");
    const ruleFormRef = ref<FormInstance>()
      const ruleForm = reactive({
      name: "",
      location: "",
      desc: "",
      roomDetail: [""],
      price: "",
      comments: "",
      appraise: "",
      img: "",
    });
    const checkAll = ref(false);
    const isIndeterminate = ref(true);
    const cities = ["wifi", "smoking", "kitchen", "laundry", "parking", "pet"];

    const handleCheckAllChange = (val) => {
      ruleForm.roomDetail = val ? cities : [];
      isIndeterminate.value = false;
    };
    const handleCheckedCitiesChange = (value) => {
      const checkedCount = value.length;
      checkAll.value = checkedCount === cities.length;
      isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
    };
    const rules = reactive<FormRules>({
      name: [
        { required: true, message: 'Please input Name', trigger: 'blur' },
      ],
      location: [
        {
          required: true,
          message: 'Please input Location',
          trigger: 'change',
        },
      ],
      roomDetail: [
        {
          type: 'array',
          required: true,
          message: ' Please select at least one option',
          trigger: 'change',
        },
      ],
      desc: [
        {
          required: true,
          message: 'Please input Location desc',
          trigger: 'change',
        },
      ],
      price: [
        {
          required: true,
          message: 'Please input price',
          trigger: 'change',
        },
      ],
      comments: [
        {
          required: true,
          message: 'Please input comments',
          trigger: 'change',
        },
      ],
      appraise: [
        {
          required: true,
          message: 'Please input appraise',
          trigger: 'change',
        },
      ],
      img: [
        {
          required: true,
          message: 'Please input img url',
          trigger: 'change',
        },
      ],
    })
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          try { 
            await store.dispatch("submitHotel", ruleForm)
            formEl.resetFields()
            ElNotification({
              title: 'Success',
              message: 'This is a success message',
              type: 'success',
            })

          } catch (e) {
            console.log(e);
            
          }
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    return {
      ruleForm,
      labelPosition,
      handleCheckAllChange,
      handleCheckedCitiesChange,
      checkAll,
      isIndeterminate,
      // checkedCities,
      cities,
      submitForm,
      rules,
      ruleFormRef
    };
  },
};
</script>
<style lang="scss">
.create-hotel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &__form {
    padding: 30px 20px;
    border: 1px solid #dfdfdf;
    border-radius: 10px;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
  }
  &__link {
    text-decoration: none;
    color: #1a2b48 !important;
  }
  .el-form {
    width: 100%;
    max-width: 500px;
  }
}
</style>
