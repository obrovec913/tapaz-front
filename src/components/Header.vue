<template>
  <nav
    class="navbar is-transparent is-fixed-top is-spaced is-tab is-active tapaz"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link to="/" class="active navbar-item">
        <img class="tapaz-logo" src="../assets/images/logo.png" />
      </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start"></div>
    </div>

    <div class="navbar-end">
      <router-link to="/" class="navbar-item">
        {{ $t('info') }}
      </router-link>
      <router-link to="/articles" class="navbar-item">
        {{ $t('articles') }}
      </router-link>
      <router-link to="/contacts" class="navbar-item">
        {{ $t('contacts') }}
      </router-link>
      <a
              class="navbar-item language"
              @click="changeLanguage('ru')"
              v-bind:class="$root.$i18n.locale === 'ru' ? 'selected-language' : ''"
      >
        <img src="../assets/images/russian-flag.svg" />
      </a>
      <a
        class="navbar-item language"
        @click="changeLanguage('en')"
        v-bind:class="$root.$i18n.locale === 'en' ? 'selected-language' : ''"
      >
        <img src="../assets/images/english-flag.svg" />
      </a>


      <a v-if="isLoggedIn" class="navbar-item" @click="logOut">
        Выйти
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import axios from 'axios';
const user = namespace('User');

@Component
export default class Header extends Vue {
  private langs: string[] = ['ru', 'en'];
  @user.State
  private isLoggedIn!: boolean;

  @user.Action
  private updateIsLoggedIn!: (updateIsLoggedIn: boolean) => void;

  private changeLanguage(lang: string): void {
    this.$root.$i18n.locale = lang;
    this.$cookies.set('lang', lang);
  }

  private async logOut(): Promise<void> {
    try {
      await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      this.updateIsLoggedIn(false);
    } catch (e) {}
  }
}
</script>

<style lang="less" scoped>
@import '../styles/main.less';

.navbar-item.violet {
  color: @violet;
}

.navbar-item img.tapaz-logo {
  max-height: 600px;
  width: auto;
}
.navbar.tapaz {
  background-color: #f9f9f9;
  border-bottom: 1px solid #d8d8d8;
  .navbar-end {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
.navbar-item {
  color: #afafaf;
  font-weight: bold;
}

.navbar-item.language {
  padding: 0;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 10px;
  border: 2px solid #afafaf;
  display: flex;
  height: fit-content;
  width: 28px;
}

.navbar-item.language.selected-language {
  border-color: #1fc52b;
}

.navbar-item:hover {
  color: @violet;
  font-weight: bold;
}
.navbar-item.router-link-exact-active {
  color: @violet;
}
</style>

<i18n>
{
  "en": {
    "info": "ABOUT US",
    "articles": "PUBLICATIONS",
    "contacts": "CONTACTS"
  },
  "ru": {
    "info": "О НАС",
    "articles": "ПУБЛИКАЦИИ",
    "contacts": "КОНТАКТЫ"
  }
}
</i18n>
