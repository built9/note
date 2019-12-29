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
import Notice from "../Notice";
import create from "@/utils/create";

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
      let msg
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          msg="login"
        } else {
          msg="err"
        }
      });

      const notice = create(Notice,{
        title:'xxx',
        message:msg,
        duration:3000
      })
      notice.show()
    }
  }
};
</script>

<style></style>
