<template>
  <div class="container contacts">
    <div class="contacts-header">
      {{ $t('contacts') }}
    </div>

    <div class="text-under-contacts">
      {{ $t('contactsInstruction') }}
    </div>
    <div class="columns">
      <div class="column email-inputs">
        <div class="field field-name">
          <div class="control">
            <input
              class="input"
              v-model="name"
              type="text"
              v-bind:placeholder="$t('name')"
            />
          </div>
        </div>

        <div class="field field-email">
          <div class="control">
            <input
              class="input"
              v-model="email"
              v-bind:placeholder="$t('emailOrPhone')"
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <textarea
              v-model="text"
              class="textarea field-text"
              v-bind:placeholder="$t('writeMessage')"
            ></textarea>
          </div>
        </div>

        <div class="control">
          <button
            :disabled="!isEmailCorrect"
            @click="sendEmail()"
            class="button is-primary send-button"
          >
            {{ $t('send') }}
          </button>
        </div>
      </div>

      <div class="column">
        <div class="links">
          <a href="tel:+375 29 674 66 88">+375 29 674 66 88</a>
          <br />
          <br />

          <a href="mailto:alieks2001@gmail.com">alieks2001@gmail.com</a>
        </div>
        <br />
        <div class="address">
          {{ $t('address-line-1') }} <br />{{ $t('address-line-2') }}
        </div>
        <br />

        <div class="logos">
               <a
            class="container-for-logo"
            href="https://scholar.google.com/citations?user=s2pxkiIAAAAJ&hl=ru"
            target="_blank"
          >
            <img src="../assets/images/GOOGLE_SCHOLAR.png" class="logo" alt="GOOGLE_SCHOLAR" />
            <div class="logo-text">{{ $t('googleScholar') }}</div>
          </a>
          <a
            class="container-for-logo"
            href="https://www.bsu.by/main.aspx?guid=98001"
            target="_blank"
          >
            <img src="../assets/images/BSU.png" class="logo" alt="BSU" />
            <div class="logo-text">{{ $t('BSU') }}</div>
          </a>
          <a
            class="container-for-logo"
            href="https://fir.bsu.by/departments/ol/ol-staff/ol-gordey"
            target="_blank"
          >
            <img src="../assets/images/BSU_FMO.png" class="logo" alt="BSU_FMO" />
            <div class="logo-text">{{ $t('FIR') }}</div>
          </a>
          <a
            class="container-for-logo"
            href="http://fes.mslu.by/kafedra-teorii-i-praktiki-kitayskogo-yazyka"
            target="_blank"
          >
            <img src="../assets/images/MSLU.png" class="logo" alt="MSLU" />
            <div class="logo-text">{{ $t('MSLU') }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios';
import notie from 'notie';

@Component
export default class Contacts extends Vue {
  private email: string = '';
  private name: string = '';
  private text: string = '';
  get isEmailCorrect() {
    return (
      this.name &&
      this.email &&
      this.text &&
      this.name.length <= 200 &&
      this.email.length <= 200 &&
      this.text.length <= 1000
    );
  }
  private async sendEmail() {
    try {
      await axios.post(
        `${process.env.VUE_APP_BACKEND_URL}/api/email`,
        {
          name: this.name,
          email: this.email,
          text: this.text,
        },
        { withCredentials: true },
      );
      this.name = '';
      this.email = '';
      this.text = '';
      notie.alert({
        type: 'success',
        text: this.$tc('messageSent'),
        time: 3,
      });
    } catch (e) {}
  }
}
</script>

<style lang="less">
@import '../styles/main.less';

.container.contacts {
  max-width: 1000px;
  padding-left: 10px;
}

.column.email-inputs {
  .field {
    max-width: 400px;
  }
}

.container.contacts {
  .column {
    .button.send-button {
      border: 1px solid #cccccc;
      color: @violet;
      font-weight: bold;
      background-color: #fcfcfc;
      opacity: 1;
    }
  }
}

.contacts-header {
  line-height: 28px;
  margin-bottom: 10px;
  font-weight: bold;
  margin-top: 100px;
  color: #646a94;
  font-size: 55px;
  padding-top: 100px;
}

.text-under-contacts {
  color: #909090 !important;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 12px;
}

.links {
  text-decoration: none;
  font-weight: bold;
  text-align: center;
}

.address {
  font-weight: bold;
  text-align: center;
}

.logos {
  text-align: center;
  .container-for-logo {
    position: relative;
    text-align: center;
    color: white;
    display: inline-block;
    width: 75px;
    margin-left: 5px;
    .logo {
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      width: 100%;
    }
    .logo-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 18px;
      font-weight: bold;
      letter-spacing: 1.2px;
    }
  }
}

.textarea.field-text {
  resize: none;
}

@media (max-width: 768px) {
  .container.contacts {
    padding-left: 0;
    .column.email-inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    margin-left: 5px;
    text-align: center;
    .field {
      width: 100%;
    }
  }
}
</style>

<i18n>
{
  "en": {
    "contacts": "CONTACTS",
    "contactsInstruction": "you can contact us using the form below or contacts on the right side",
    "send": "Send",
    "name": "Name",
    "emailOrPhone": "E-mail or phone",
    "writeMessage": "Write a message",
    "messageSent": "Message have been successfully sent",
    "address-line-1": "220012 Belarus, Minsk",
    "address-line-2": "vulica Akademičnaja, 3",
    "googleScholar": "Google Scholar",
    "BSU": "BSU",
    "FIR": "FIR",
    "MSLU": "MSLU"
  },
  "ru": {
    "contacts": "КОНТАКТЫ",
    "contactsInstruction": "с нами можно связаться, используя форму ниже или контакты справа",
    "send": "Отправить",
    "name": "Имя",
    "emailOrPhone": "E-mail или телефон",
    "writeMessage": "Написать",
    "messageSent": "Ваше сообщение было успешно отправлено",
    "address-line-1": "220012 Беларусь, Минск",
    "address-line-2": "Академическая, 3",
    "googleScholar": "Google Scholar",
    "BSU": "БГУ",
    "FIR": "ФМО",
    "MSLU": "МГЛУ"
  }
}
</i18n>
