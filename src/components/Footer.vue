<template>
<footer class="footer">
    <div class="content has-text-centered">
      <p>&copy; 2020 TAPAZ.BY</p>
      <p>{{ $t('allRightsReserved') }}</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Footer extends Vue {}
</script>

<style scoped>
.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background: rgba(252, 252, 252, 1);
  border-top: 1px solid #ebebeb;
  color: #646a94;
  font-family: 'Noto Sans', sans-serif;
  font-weight: bold;
  line-height: 3px;
  padding-bottom: 25px;
  padding-top: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}
</style>

<i18n>
{
  "en": {
    "allRightsReserved": "All rights reserved"
  },
  "ru": {
    "allRightsReserved": "Все права защищены"
  }
}
</i18n>