<template>
  <div>
    <myForm :model="model" :rules="rules" ref="loginForm">
      <myFormItem label="用户名" prop="username">
        <myInput v-model="model.username"></myInput>
      </myFormItem>
      <myFormItem label="密码" prop="password">
        <myInput v-model="model.password" type="password"></myInput>
      </myFormItem>
      <myFormItem>
        <button @click="onLogin">登录</button>
      </myFormItem>
    </myForm>
    {{ model }}
  </div>
</template>

<script>
import myInput from "./myInput.vue";
import myFormItem from "./myFormItem.vue";
import myForm from "./myForm.vue";

export default {
  components: {
    myInput,
    myFormItem,
    myForm
  },
  data() {
    return {
      model: {
        username: "admin",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "用户名必填" }],
        password: [{ required: true, message: "密码必填" }]
      }
    };
  },
  methods: {
    onLogin() {
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          alert("login");
        } else {
          alert("err");
        }
      });
    }
  }
};
</script>

<style></style>
