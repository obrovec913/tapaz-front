<template>
  <div class="article">
    <AddArticleModal
      v-if="showAddArticleModal"
      :articleForEdit="Object.assign({}, article)"
      @close="
        () => {
          showAddArticleModal = false;
          getArticles();
        }
      "
    />
    <div class="article-title">
      <font-awesome-icon v-if="isLoggedIn" :icon="['fa', article.translations[$root.$i18n.locale].isVisible ? 'eye' : 'eye-slash']" />
      {{ article.translations[$root.$i18n.locale].title }}
      <button
        v-if="isLoggedIn"
        class="button"
        @click="showAddArticleModal = true"
      >
        <font-awesome-icon :icon="['fa', 'pencil-alt']" />
      </button>
    </div>
    <div class="article-source">{{ article.translations[$root.$i18n.locale].source }}</div>
    <div class="article-description">{{ article.translations[$root.$i18n.locale].description }}</div>
    <hr class="article-line" />
    <a class="article-link" v-bind:href="article.translations[$root.$i18n.locale].link" target="_blank">{{ $t('read') }}</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import AddArticleModal from './AddArticleModal.vue';
import { IArticle } from '../interfaces/article.interfaces';
const user = namespace('User');

@Component({
  components: {
    AddArticleModal,
  },
})
export default class Article extends Vue {
  @Prop()
  private article!: IArticle;
  @Prop()
  private getArticles!: () => void;
  @user.State
  private isLoggedIn!: boolean;
  private showAddArticleModal: boolean = false;
}
</script>

<style scoped>
.article {
  margin-top: 20px;
  margin-bottom: 70px;
}

.article-title {
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
  text-align: justify;
  hyphens: none;
}

.article-source {
  color: rgb(120, 120, 120);
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 5px;
}

.article-description {
  font-weight: 500;
  text-align: justify;
}

.article-line {
  margin-top: 10px;
  margin-bottom: 5px;
  width: 200px;
}

.article-link {
  color: black;
}

.article-link:hover {
  background-color: #D7D8D9;
}

@media (max-width: 1024px) {
  div.article-description {
    max-width: 98%;
    margin-left: 0px;
  }
  div.article-title {
    max-width: 98%;
    margin-left: 0px;
  }
  div.article-source {
    max-width: 98%;
    margin-left: 0px;

  }
}
</style>

<i18n>
{
  "en": {
    "read": "read"
  },
  "ru": {
    "read": "читать"
  }
}
</i18n>
