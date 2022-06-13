<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Статья</p>
        <button class="delete" @click="$emit('close')"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Основная или новая статья?</label>
          <div class="control">
            <label class="radio">
              <input type="radio" :value="true" v-model="article.isMain" />
              Основная
            </label>
            <label class="radio">
              <input type="radio" :value="false" v-model="article.isMain" />
              Новая
            </label>
          </div>
        </div>
        <div v-if="article.isMain" class="field">
          <label class="label">Порядок статьи</label>
          <div class="control">
            <input
              class="input"
              type="number"
              placeholder="Порядок статьи"
              v-model="article.order"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Язык</label>
          <div class="select">
            <select v-model="selectedLanguage">
              <option
                v-for="(lang, index) in languages"
                v-bind:key="index"
                :value="lang"
                >{{ lang }}</option
              >
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Название статьи</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Название статьи"
              v-model="article.translations[selectedLanguage].title"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Источник</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Источник"
              v-model="article.translations[selectedLanguage].source"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Краткое описание</label>
          <div class="control">
            <textarea
              v-model="article.translations[selectedLanguage].description"
              class="textarea description-field"
              placeholder="Краткое описание"
            ></textarea>
          </div>
        </div>
        <div class="field">
          <label class="label">Ссылка</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="https://google.com"
              v-model="article.translations[selectedLanguage].link"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Видна ли статья?</label>
          <div class="control">
            <label class="radio">
              <input
                type="radio"
                :value="true"
                v-model="article.translations[selectedLanguage].isVisible"
              />
              Да
            </label>
            <label class="radio">
              <input
                type="radio"
                :value="false"
                v-model="article.translations[selectedLanguage].isVisible"
              />
              Нет
            </label>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          class="button is-success"
          @click="articleForEdit ? editArticle() : createArticle()"
          :disabled="!isArticleCorrect"
        >
          Сохранить
        </button>
        <button
          v-if="articleForEdit"
          class="button is-danger"
          @click="deleteArticle()"
        >
          Удалить
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import notie from 'notie';
import { IHttpError } from '../interfaces/common.interfaces';
import {
  IArticle,
  IArticleCreatePayload,
} from '@/interfaces/article.interfaces';
import { LANGUAGE } from '../constants/constants';

@Component
export default class AddArticleModal extends Vue {
  @Prop()
  private articleForEdit!: IArticle;
  private article: IArticleCreatePayload = {
    isMain: false,
    order: null,
    translations: {
      en: {
        link: '',
        title: '',
        source: '',
        description: '',
        isVisible: false,
      },
      ru: {
        link: '',
        title: '',
        source: '',
        description: '',
        isVisible: false,
      },
    },
  };
  private languages: string[] = Object.values(LANGUAGE);
  private selectedLanguage: string = LANGUAGE.ru;

  private async createArticle() {
    try {
      await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}/api/article`,
        this.article,
        { withCredentials: true },
      );

      this.$emit('close');
    } catch (e) {
      this.checkError(e);
    }
  }

  private async editArticle() {
    try {
      await axios.put(
        `${process.env.VUE_APP_BACKEND_URL}/api/article/${this.articleForEdit._id}`,
        this.article,
        { withCredentials: true },
      );

      this.$emit('close');
    } catch (e) {
      console.log(e);
      this.checkError(e);
    }
  }

  private async deleteArticle() {
    try {
      await axios.delete(
        `${process.env.VUE_APP_BACKEND_URL}/api/article/${this.articleForEdit._id}`,
        {
          withCredentials: true,
        },
      );

      this.$emit('close');
    } catch (e) {
      this.checkError(e);
    }
  }

  private async checkError(e: IHttpError) {
    if (e.response.status === 401) {
      notie.alert({
        type: 'error',
        text: 'Вы не авторизованы',
        time: 3,
      });
    }
  }

  get isArticleCorrect() {
    // return (
    //   this.link &&
    //   this.title &&
    //   this.source &&
    //   this.description &&
    //   ((this.isMain && this.order) || !this.isMain)
    // );
    return true;
  }

  private async mounted() {
    if (this.articleForEdit) {
      this.article = this.articleForEdit;
    }
  }
}
</script>

<style scoped>
.textarea.description-field {
  resize: none;
  height: 300px;
}
.modal-card-foot {
  margin-bottom: 50px;
}
</style>
