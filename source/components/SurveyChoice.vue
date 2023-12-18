<template>
  <div class="radio-buttons-input">
    <p><strong>{{ caption }}</strong></p>
    <fieldset>
      <div
        v-for="(option, index) in options"
        :key="`${name}-${option.caption}-${index}`"
        class="option">
        <input
          :id="`${name}-${option.caption}`"
          v-model="radioValue"
          type="radio"
          name="radio-buttons"
          :value="option.val">
        <label
          :for="`${name}-${option.caption}`"
        >
          {{ $t(option.caption) }}
        </label>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SurveyChoice',
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    caption: {
      type: String,
    },
  },
  data() {
    return {
      radioValue: '',
    };
  },
  computed: {
  },
  watch: {
    radioValue() {
      this.emitRadioValue();
    },
  },
  mounted() {
  },
  created() {
  },
  methods: {
    emitRadioValue() {
      this.$emit('radioValueChanged', this.radioValue);
    },
  },
};
</script>

<style scoped lang="scss">
$radio-active-color: palette(primary);

.radio-buttons-input {
  width: 100%;
  margin: $pad 10px 0 0;
  padding: 15px 20px 0;
  background: palette(grey, ultralight);
  border-radius: 5px 5px 0 0;

  p {
    margin: 0 0 12px;
    font-size: 80%;

    @include bp(m) {
      margin: 0 0 4px;
      font-size: 100%;
    }
  }

  fieldset {
    display: flex;
    justify-content: flex-start;
    width: max-content;
  }

  .option {
    display: flex;
    flex-direction: inherit;
    align-items: center;
    margin-right: 40px;

    & input[type="radio"] {
      display: block;
      width: 18px;
      height: 18px;
      margin:0;
      background-color: transparent;
      border-radius: 50%;
      content: '';

      &:checked[type="radio"] {
        background-color: $radio-active-color; // Set the background color to red when checked
        border: 1px solid palette(grey,light); // Use the active color for the border
        appearance: none;
      }
    }
  }

  label {
    margin-top: 6px;
    margin-left: 10px;
  }
}

</style>
