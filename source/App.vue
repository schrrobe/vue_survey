<template>
  <div
    v-if="showModal"
    id="empty-vue-component"
  >
    <survey-page-overlay>
      <survey-modal
        medium
        @close="showModal = false; sendSurveyData()"
      >
        <div>
          <star-rating
            :caption-highest="$t('captionHighest')"
            :caption-lowest="$t('captionLowest')"
            :headline="$t('question.satisfaction')"
            name="satisfaction"
            :data="data.survey.ratings.satisfaction"
            @ratingChanged="satisfactionRating = $event" />
          <star-rating
            :caption-highest="$t('captionHighest')"
            :caption-lowest="$t('captionLowest')"
            :headline="$t('question.easyAccess')"
            name="easyAccess"
            :data="data.survey.ratings.access"
            @ratingChanged="accessRating = $event"
          />
        </div>
        <div v-if="accessRating && satisfactionRating">
          <div class="access-choice-and-reason-input-block">
            <survey-choice
              :caption="$t('question.access.headline')"
              name="customer-got-products"
              :options="data.survey.options.foundProducts"
              @radioValueChanged="accessRadioValue = $event"
            />
            <text-input
              id="reasonForVisit"
              :caption="$t('question.reasonForVisit.headline')"
              name="reasonForVisit"
              :maxlength="100"
              no-top-space
              :placeholder="$t('question.reasonForVisit.placeholder')"
              @textInputValueChanged="textInputValueReasonForVisit = $event"
            />
          </div>
          <text-input
            id="additionalNote"
            :caption="$t('question.additionalNote.headline')"
            text-area
            name="additionalNote"
            :maxlength="2000"
            :placeholder="$t('question.additionalNote.placeholder')"
            @textInputValueChanged="textInputValueAdditionalNote = $event"
          />
          <survey-button
            primary
            center
            small
            @close="showModal = false; sendSurveyData()"
          >
            {{ $t('sendButton') }}
          </survey-button>
        </div>
      </survey-modal>
    </survey-page-overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import vuex, { mapGetters } from 'vuex';
import axios from 'axios';
import StarRating from './components/StarRating.vue';
import SurveyPageOverlay from './components/SurveyPageOverlay.vue';
import SurveyModal from './components/SurveyModal.vue';
import TextInput from './components/TextInput.vue';
import SurveyChoice from './components/SurveyChoice.vue';
import SurveyButton from './components/SurveyButton.vue';

import json from './data/data.json';

Vue.use(vuex);
// Vue.use(axios);

export default {
  name: 'App',
  components: {
    SurveyChoice,
    StarRating,
    SurveyPageOverlay,
    SurveyModal,
    SurveyButton,
    TextInput,
  },
  props: [
  ],
  data() {
    return {
      satisfactionRating: null,
      accessRating: null,
      accessRadioValue: null,
      surveyCanceledByUser: null,
      data: json,
      showModal: false,
      textInputValueReasonForVisit: null,
      textInputValueAdditionalNote: null,
      pressedKeys: null,
      url: null,
    };
  },
  computed: {
    ...mapGetters([
      'delay',
    ]),

    requestBodyData() {
      return {
        satisfaction: this.satisfactionRating,
        agreementTariffProds: this.accessRating,
        foundAnythingToSearch: this.accessRadioValue,
        lookingFor: this.textInputValueReasonForVisit,
        remarks: this.textInputValueAdditionalNote,
        aborted: this.surveyCanceledByUser,
        url: this.url,
      };
    },
  },
  watch: {
  },
  mounted() {
    this.modalInit();
  },
  beforeDestroy() {
  },
  created() {
  },
  methods: {
    modalInit() {
      setTimeout(() => {
        this.showModal = true;
      }, this.delay);
    },

    sendSurveyData() {
      this.surveyCanceledByUser =
        !!Object.values(this.requestBodyData).every((val) => val === null);

      const apiUrl = '/api/survey/savesurveydata';
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      this.url = window.location.pathname;
      const requestData = JSON.stringify(this.requestBodyData);
      axios.post(apiUrl, requestData, config)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.info(response.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          localStorage.setItem('aySurveyModalShown', 'yes');
        });
    },
  },
};
</script>

<style scoped lang="scss">
.survey-continue-text {
  margin-top: 20px;
  padding: 0 20px;

  p {
    margin-bottom: 5px;
    font-size: 80%;

    @include bp(m) {
      margin: 0 0 5px;
      font-size: 100%;
    }
  }
}

.access-choice-and-reason-input-block {
  background: palette(grey, ultralight);
  border-radius: 5px;
}
</style>
