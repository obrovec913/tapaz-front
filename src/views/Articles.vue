<template>
  <div class="container articles-container">
    <div class="articles-column-name">{{ $t('articles') }}</div>
    <button
      v-if="isLoggedIn"
      class="button"
      @click="showAddArticleModal = true"
    >
      Добавить статью
    </button>
    <AddArticleModal
      v-if="showAddArticleModal"
      @close="
        () => {
          showAddArticleModal = false;
          getArticles();
        }
      "
    />
    <div v-if="articles.length">
      <div class="articles-column-description">
        {{ $t('articlesDescription') }}
      </div>
      <div class="control">
        <input
          class="input article-name-input"
          type="text"
          v-model="articleName"
          v-bind:placeholder="`${$t('findArticle')}...`"
        />
      </div>
      <div class="columns" v-if="mainArticles.length || latestArticles.length">
        <div class="column">
          <div class="articles">{{ $t('mainArticles') }}:</div>
          <Article
            v-for="(article, index) in mainArticles"
            v-bind:key="index"
            :article="article"
            :getArticles="getArticles"
          />
        </div>
        <div class="column">
          <div class="articles latest-articles">{{ $t('latestUpdates') }}:</div>
          <Article
            v-for="(article, index) in latestArticles"
            v-bind:key="index"
            :article="article"
            :getArticles="getArticles"
          />
        </div>
      </div>
      <div class="no-articles" v-else-if="articles.length">
        {{ $t('noArticles') }}
      </div>
    </div>
    <div v-if="!articlesAreReceived" class="articles-loader">
      <ClipLoader
        :loading="!articlesAreReceived"
        :color="spinnerColor"
        :size="'100px'"
      ></ClipLoader>
      Загрузка статей
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IArticle } from '../interfaces/article.interfaces';
import Article from '../components/Article.vue';
import AddArticleModal from '../components/AddArticleModal.vue';
import axios from 'axios';
import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import { namespace } from 'vuex-class';
import { LANGUAGE } from '../constants/constants';
const user = namespace('User');

@Component({
  components: {
    Article,
    AddArticleModal,
    ClipLoader,
  },
})
export default class Articles extends Vue {
  private articles: IArticle[] = [];
  private showAddArticleModal: boolean = false;
  @user.State
  private isLoggedIn!: boolean;
  private articleName: string = '';
  private spinnerColor: string = '#646a94';
  private articlesAreReceived: boolean = false;

  get mainArticles(): IArticle[] {
    return this.articles
      .filter(
        (article) =>
          article.isMain &&
          ((!this.isLoggedIn &&
            article.translations[this.$root.$i18n.locale as LANGUAGE]
              .isVisible) ||
            this.isLoggedIn) &&
          (article.translations[this.$root.$i18n.locale as LANGUAGE].title
            .toLowerCase()
            .includes(String(this.articleName.toLowerCase())) ||
            article.translations[
              this.$root.$i18n.locale as LANGUAGE
            ].description
              .toLowerCase()
              .includes(String(this.articleName.toLowerCase()))),
      )
      .sort((a, b) => (a.order as number) - (b.order as number));
  }

  get latestArticles(): IArticle[] {
    return this.articles
      .filter(
        (article) =>
          !article.isMain &&
          ((!this.isLoggedIn &&
            article.translations[this.$root.$i18n.locale as LANGUAGE]
              .isVisible) ||
            this.isLoggedIn) &&
          (article.translations[this.$root.$i18n.locale as LANGUAGE].title
            .toLowerCase()
            .includes(String(this.articleName.toLowerCase())) ||
            article.translations[
              this.$root.$i18n.locale as LANGUAGE
            ].description
              .toLowerCase()
              .includes(String(this.articleName.toLowerCase()))),
      )
      .sort((a, b) => +a.createdAt - +b.createdAt);
  }

  private async getArticles() {
    const { data } = await axios.get(
      `${process.env.VUE_APP_BACKEND_URL}/api/article`,
    );
    this.articles = data;
    this.articlesAreReceived = true;
  }

  private async mounted() {
    await this.getArticles();
  }
}
</script>

<style scoped lang="less">
@import '../styles/main.less';

.container.articles-container {
  margin-top: 150px;
  margin-bottom: 100px;
}

.articles-column-name {
  color: @violet;
  font-size: 40px;
  font-weight: bold;
  padding-top: 20px;
}

.articles-column-description {
  color: rgb(164, 164, 164);
  margin-bottom: 10px;
}

.input.article-name-input {
  max-width: 500px;
}

.articles {
  color: @violet;
  font-weight: bold;
  margin-top: 25px;
}

.no-articles {
  color: @violet;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
}

.articles-loader {
  display: flex;
  align-items: center;
  flex-flow: column;
  color: rgb(164, 164, 164);
  font-size: 24px;
}

@media (max-width: 768px) {
  .container {
    margin-left: 5px;
  }
  .articles-column-name {
    padding-top: 30px;
  }
  .columns {
    margin-right: 10px;
    margin-left: 10px;
  }
}
</style>

<i18n>
{
  "en": {
    "articles": "PUBLICATIONS",
    "articlesDescription": "our works in the field of semantic analysis are presented here",
    "mainArticles": "MAIN PUBLICATIONS",
    "latestUpdates": "LATEST UPDATES",
    "findArticle": "Find an article",
    "noArticles": "There are no articles matching your criteria"
  },
  "ru": {
    "articles": "ПУБЛИКАЦИИ",
    "articlesDescription": "здесь представлены наши труды в области семантического анализа",
    "mainArticles": "ОСНОВНЫЕ ПУБЛИКАЦИИ",
    "latestUpdates": "ПОСЛЕДНИЕ ОБНОВЛЕНИЯ",
    "findArticle": "Найти статью",
    "noArticles": "Отсутствуют статьи, соответствующие вашему запросу"
  }
}
</i18n>
