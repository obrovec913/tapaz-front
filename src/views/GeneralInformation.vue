<template>
  <div class="general-information">
    <div class="meaning-and-abbreviation-wrapper">
      <div class="meaning-and-abbreviation">
        <div class="tapaz-abbreviation-meaning">
          <div class="vertical-theory-word">{{ $t('Theory') }}</div>
          <div class="other-words">
            {{ $t('Automatic') }}<br />{{ $t('Generation') }}<br />{{
              $t('ofKnowledge')
            }}<br />{{ $t('Architecture') }}<br />
          </div>
        </div>
        <div class="tapaz-abbreviation">
          {{ $t('TAPAZ-2') }}
        </div>
        <img
          class="down-arrow"
          src="../assets/images/down.png"
          v-scroll-to="{
            el: '.biography-name',
            container: 'body',
            duration: 300,
            offset: -120,
            easing: 'ease',
            force: true,
            cancelable: true,
            x: false,
            y: true,
          }"
        />
      </div>
    </div>
    <div class="biography-wrapper">
      <div class="biography">
        <div class="biography-name">
          {{ $t('Hardzei') }}<br />{{ $t('Alexander') }}<br /><span
            v-if="$i18n.locale === 'ru'"
            >{{ $t('Nikolaevich') }}</span
          >
        </div>
        <div class="photo-and-text-part-1">
          <img class="biography-photo" src="../assets/images/PhotoAG.png" />
          <div class="biography-text part-1">
            {{ $t('text1') }}
          </div>
        </div>
        <div class="biography-text part-2">{{ $t('text2') }}</div>
        <div class="animation-and-text-part-3">
          <img class="tapaz-animation" src="../assets/images/gif_tapaz-4.gif" />
          <div class="biography-text part-3">
            {{ $t('text3') }}
          </div>
        </div>
        <div class="up-arrow-wrapper">
          <img
            src="../assets/images/up.png"
            v-scroll-to="{
              el: 'body',
              container: 'body',
              duration: 500,
              easing: 'ease',
              offset: -200,
              force: true,
              cancelable: true,
              x: false,
              y: true,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GeneralInformation extends Vue {}
</script>

<style scoped lang="less">
@import '../styles/main.less';

.general-information {
  background: url('../assets/images/abstract.png') no-repeat;
  background-position: right 0 top 250px;
}

.meaning-and-abbreviation-wrapper {
  display: flex;
  justify-content: center;
}

.meaning-and-abbreviation {
  .tapaz-abbreviation-meaning {
    font-family: noto_semi_bold;
    display: flex;
    font-size: 60px;
    font-weight: 600;
    letter-spacing: -1px;
    padding-top: 73px;
  }

  .vertical-theory-word {
    writing-mode: tb;
    transform: rotate(180deg);
    align-self: baseline;
    margin-top: 8px;
    line-height: 57px;
  }

  .other-words {
    font-weight: 600;
    line-height: 62px;
  }

  .tapaz-abbreviation {
    margin-left: 60px;
    font-size: 120px;
    line-height: 95px;
    font-weight: 600;
    color: @violet;
  }

  .down-arrow {
    margin-left: 360px;
    margin-top: 50px;
    cursor: pointer;
  }
}

.biography-wrapper {
  display: flex;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
}

.biography {
  margin-top: 20px;
  max-width: 1440px;

  .biography-name {
    color: @violet;
    font-size: 50px;
    font-weight: bold;
    line-height: 50px;
    letter-spacing: 0px;
    position: relative;
    z-index: 2;
    margin-left: 45px;
    margin-bottom: 45px;
  }

  .biography-text {
    font-size: 18px;
    text-indent: 50px;
    font-weight: bold;
    text-align: justify;
    &:first-letter {
      color: @violet;
      font-size: 30px;
    }
  }

  .photo-and-text-part-1 {
    display: flex;
    position: relative;
    z-index: 1;
    bottom: 80px;
    margin-left: 150px;

    .biography-photo {
      width: auto;
      max-height: 374px;
      max-width: 374px;
    }
  }

  .biography-text.part-1 {
    top: 265px;
    margin-top: 260px;
    max-width: 740px;
  }

  .biography-text.part-2 {
    max-width: 850px;
    margin-left: 120px;
    margin-top: -30px;
  }

  .animation-and-text-part-3 {
    margin-left: 50px;
    margin-top: -80px;
    margin-bottom: 50px;
    position: relative;

    .tapaz-animation {
      width: auto;
      max-height: 456px;
      position: relative;
      z-index: 1;
      top: 160px;
    }

    .biography-text.part-3 {
      z-index: 2;
      position: relative;
      background-color: white;
      padding-left: 20px;
      padding-top: 10px;
      margin-left: 450px;
      max-width: 980px;
      margin-top: 10px;
    }
  }

  .up-arrow-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 200px;
    cursor: pointer;
  }
}

@media (max-width: 1024px) {
  .general-information {
    background: none;
  }
  .biography {
    display: flex;
    flex-direction: column;
    align-items: center;
    .photo-and-text-part-1 {
      flex-direction: column;
      align-items: center;
      position: static;
      bottom: 0;
      margin-left: 0;

      .biography-text.part-1 {
        margin-top: 0;
        max-width: 85%;
        margin-left: 0px;
      }
      .biography-photo {
        border: 2px solid @violet;
        border-radius: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .biography-name {
        margin-bottom: 15px;
      }
    }
    .biography-text.part-2 {
      max-width: 85%;
      margin-left: 0px;
      margin-top: auto;
    }

    .animation-and-text-part-3 {
      margin-top: 0;
      margin-left: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .tapaz-animation {
        margin-top: 10px;
        position: static;
      }


      .biography-text.part-3 {
        max-width: 85%;
        margin-left: 0px;
        padding: 0;
      }
    }
  }
}

@media (max-width: 720px) {
  .meaning-and-abbreviation {
    .tapaz-abbreviation-meaning {
      font-size: 40px;
      .vertical-theory-word {
        line-height: 40px;
        margin-top: 6px;
      }
      .other-words {
        line-height: 40px;
      }
    }

    .tapaz-abbreviation {
      font-size: 90px;
      margin-left: 40px;
      line-height: 70px;
    }
    .down-arrow {
      margin-left: 268px;
      margin-top: 15px;
      height: 50px;
    }
  }
  .biography-wrapper {
    margin-left: 0;
    margin-right: 0;
  }

  .biography {
    margin-top: 0;
    margin-left: 10px;
    margin-right: 10px;
    .animation-and-text-part-3 {
      .biography-text.part-3 {
        margin-top: 0;
      }
    }
    .biography-name {
      margin-bottom: 15px;
    }
  }
}

@media (max-width: 450px) {
  .meaning-and-abbreviation {
    .tapaz-abbreviation-meaning {
      font-size: 30px;
      .vertical-theory-word {
        line-height: 30px;
        margin-top: 3px;
      }
      .other-words {
        line-height: 30px;
      }
    }

    .tapaz-abbreviation {
      font-size: 60px;
      margin-left: 30px;
      line-height: 45px;
    }
    .down-arrow {
      margin-left: 180px;
      margin-top: 15px;
      height: 40px;
    }
  }

  .biography {
    .photo-and-text-part-1 {
      .biography-photo {
        width: 100%;
      }
    }
  }
}
</style>

<i18n>
{
  "en": {
    "text1": "Hardzei Aliaksandr (born 1965), Doctor of Philology (1999), Professor (2005), Head of Theory and Practice of Chinese Language Department of Minsk State Linguistic University, Professor of Oriental Language & Country Studies’ Department of Belarusian State University, Head Scientist of the System Analysis and Strategic Research Center of Belarus National Academy of Sciences. He is an expert in the fields of formal semantics, computer science, cognitive science, artificial intelligence, Chinese language and Oriental studies.",
    "text2": "He is an author of 80 scientific publications in Russian, English and Chinese in these fields. In 1995 he founded the Belarusian Association of Orientalists “Taigen”, in 1996 the Oriental Language & Country Studies’ Department, in 2006 the Republican Confucius Institute of Sinology, and in 2018 the Theory and Practice of Chinese Language Department. He is a member of the Council for Oriental & African Studies of Moscow State University (2007), the foreign member of the Board of the All-China Fund for the Development of Education of the PRC (2016) and a member of the Council of the International Confucian Association (2020).",
    "text3": "In 1998 “Foundations of the Theory for Automatic Generation of Knowledge Architecture (TAPAZ-1)” were represented in the monograph “The Principles for Semantics Calculus of Subject Domains”. In 1999 the monograph was defended as the doctoral dissertation under the supervision of the Honored Scientist of Republic of Belarus Prof. V.V. Martynov in the Research Center “Semantics” of Minsk State Linguistic University. TAPAZ-2 is an evolution of TAPAZ-1 with the essential improvement in the theory and implementation. The book “Theory for Automatic Generation of Knowledge Architecture: TAPAZ-2” (2017) will be interesting for a wide range of natural language and computer science researchers.",
    "Hardzei": "Hardzei",
    "Alexander": "Aliaksandr",
    "Theory": "THEORY",
    "Automatic": "FOR AUTOMATIC",
    "Generation": "GENERATION OF",
    "ofKnowledge": "KNOWLEDGE",
    "Architecture": "ARCHITECTURE",
    "TAPAZ-2": "TAPAZ-2"
  },
  "ru": {
    "text1": "Гордей Александр Николаевич, 1965 г. р., доктор филологических наук (1999), профессор (2005), заведующий кафедрой теории и практики китайского языка Минского государственного лингвистического университета, профессор кафедры языкознания и страноведения Востока Белорусского государственного университета, главный научный сотрудник Центра системного анализа и стратегических исследований Национальной академии наук Беларуси. Специалист в области формальной семантики, информатики, искусственного интеллекта, китайского языка и востоковедения.",
    "text2": "Создатель Белорусской ассоциации востоковедов «Тайген» (1995), кафедры языкознания и страноведения Востока (1996), Республиканского института китаеведения им. Конфуция (2006), кафедры теории и практики китайского языка Минского государственного лингвистического университета (2018). Член Совета по востоковедению и африканистике Московского государственного университета (2007), иностранный член Совета Всекитайского фонда развития образования КНР (2016), член Совета Международной конфуцианской ассоциации (2020). Автор 80 научных работ на русском, английском и китайском языках.",
    "text3": "Основания Теории автоматического порождения архитектуры знаний (ТАПАЗ-1) заложены в монографии «Принципы исчисления семантики предметных областей» (1998) и одноимённой докторской диссертации (1999), выполненной при научном консультировании Заслуженного деятеля науки Республики Беларусь проф. В.В. Мартынова во время работы в Научно-исследовательском центре «Семантика» Минского государственного лингвистического университета (1992-1998). ТАПАЗ-2 является дальнейшим развитием ТАПАЗ-1 с факториальным увеличением мощности семантических вычислений. Книга \"Теория автоматического порождения архитектуры знаний: ТАПАЗ-2\" (2017) рассчитана на широкий круг исследователей в области естественного языка и информатики.",
    "Hardzei": "Гордей",
    "Alexander": "Александр",
    "Nikolaevich": "Николаевич",
    "Theory": "ТЕОРИЯ",
    "Automatic": "АВТОМАТИЧЕСКОГО",
    "Generation": "ПОРОЖДЕНИЯ",
    "ofKnowledge": "АРХИТЕКТУРЫ",
    "Architecture": "ЗНАНИЙ",
    "TAPAZ-2": "ТАПАЗ-2"
  }
}
</i18n>
