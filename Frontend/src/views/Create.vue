<template>
  <div class="create-hotel">
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
      <el-form-item label="text" prop="text">
        <el-input v-model="ruleForm.comments" />
      </el-form-item>
      <el-form-item label="Number" prop="number">
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
</template>

<script lang="ts">
import { useStore } from "vuex";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
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
    const cities = ["WIFI", "SMOKING", "KITCHEN", "LAUNDRY", "PARKING", "PET"];

    const handleCheckAllChange = (val) => {
      ruleForm.roomDetail = val ? cities : [];
      isIndeterminate.value = false;
    };
    const handleCheckedCitiesChange = (value) => {
      const checkedCount = value.length;
      checkAll.value = checkedCount === cities.length;
      isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
      console.log(ruleForm.roomDetail);
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
  justify-content: center;
  align-items: center;
  height: 100vh;
  .el-form {
    width: 70%;
  }
}
</style>
