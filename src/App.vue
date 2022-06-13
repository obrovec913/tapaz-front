<template>
  <div>
    <Header />
    <div class="main-tapaz">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import axios from 'axios';
import { namespace } from 'vuex-class';
const user = namespace('User');

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {
  @user.Action
  private updateIsLoggedIn!: (updateIsLoggedIn: boolean) => void;

  private async mounted(): Promise<void> {
    const lang: string = this.$cookies.get('lang') as string;
    this.$root.$i18n.locale = lang || 'ru';
    await this.getIsLoggedIn();
  }

  private async getIsLoggedIn(): Promise<void> {
     try {
      await axios.get(
        `${process.env.VUE_APP_BACKEND_URL}/api/auth/user`,
        { withCredentials: true },
      );

      this.updateIsLoggedIn(true);
    } catch (e) {}
  }
}
</script>

<style>
.main-tapaz {
  margin-top: 100px;
  margin-bottom: 90px;
}
</style>
