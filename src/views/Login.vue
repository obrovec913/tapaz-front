<template>
  <div class="container login-form">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">E-mail</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="email" v-model="email" placeholder="E-mail" />
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Пароль</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="password" v-model="password" placeholder="Пароль" />
          </p>
        </div>
      </div>
    </div>
    <button :disabled="!email || !password" class="button login-button is-success" v-on:click="login()">Войти</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const user = namespace('User');
import axios from 'axios';
import notie from 'notie';
import { IHttpError } from '../interfaces/common.interfaces';

@Component
export default class Login extends Vue {
  private email: string = '';
  private password: string = '';
  @user.Action
  private updateIsLoggedIn!: (updateIsLoggedIn: boolean) => void;

  private async login() {
    try {
      await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}/api/auth/login`,
        {
          email: this.email,
          password: this.password,
        },
        { withCredentials: true },
      );

      this.updateIsLoggedIn(true);
      this.$router.replace('/articles');
    } catch (e) {
      this.checkError(e);
    }
  }

  private async checkError(e: IHttpError) {
    if (e.response.status === 401) {
      notie.alert({
        type: 'error',
        text: 'Неверный логин или пароль',
        time: 3,
      });
    }
  }
}
</script>

<style scoped>
.container.login-form {
  max-width: 400px;
}

.button.login-button {
  width: 100%;
}
</style>
