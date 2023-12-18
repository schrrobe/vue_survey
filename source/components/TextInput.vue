<template>
  <div
    class="text-input-wrapper"
    :class="{
    'text-input-wrapper--no-top--space': noTopSpace,
    }">
    <p><strong>{{ caption }}</strong></p>
    <fieldset>
      <input
        v-if="!textArea"
        :id="id"
        v-model="textInputValue"
        class="text-input"
        :maxlength="maxlength"
        type="text"
        :name="name"
        :placeholder="placeholder"
      />
      <textarea
        v-if="textArea"
        :id="id"
        v-model="textInputValue"
        :maxlength="maxlength"
        class="text-input text-input--text-area"
        :name="name"
        rows="4"
        cols="40"
        :placeholder="placeholder"
      />
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    textArea: {
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
    },
    maxlength: {
      type: Number,
    },
    id: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    small: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    noTopSpace: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textInputValue: null,
    };
  },
  computed: {},
  watch: {
    textInputValue(newVal) {
      this.textInputValue = newVal.replaceAll(/[&/\\#+()$~%^'":*<>{}\[\]]/g, '');
      this.$emit('textInputValueChanged', this.textInputValue);
    },
  },
  created() {
  },
  methods: {

  },
};
</script>

<style scoped lang="scss">
.text-input-wrapper {
  width: 100%;
  margin: 0 10px 10px 0;
  padding: 15px 20px;
  background: palette(grey, ultralight);
  border-radius: 5px;

  &--no-top-space {
    margin-top: 0;
    padding-top: 0;
  }

  .text-input {
    width: 100%;
    height: 50px;

    &--text-area {
      height: 100px;
      overflow: auto;
    }
  }

  p {
    margin: 0 0 12px;
    font-size: 80%;

    @include bp(m) {
      margin: 0 0 12px;
      font-size: 100%;
    }
  }
}
</style>
