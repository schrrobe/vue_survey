<template>
  <div
    class="survey-button"
    :class="{
  'button-centered': center,
  }"
  >
    <a
      :href="`${link}`"
      rel="nofollow"
      class="button"
      :class="{
     'button-primary': primary,
     'survey-button-secondary': secondary,
     'button-size-small': small,

     }"
      @click="$emit('close')"
    >
      <slot />
      <span
        v-if="secondary"
        class="icon" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'SurveyButton',
  props: {
    link: {
      type: String,
      default: '#',
    },
    primary: {
      type: Boolean,
    },
    secondary: {
      type: Boolean,
    },
    small: {
      type: Boolean,
    },
    center: {
      type: Boolean,
    },

  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  created() {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">

.survey-button {
  display: flex;
  background-color: #fff;

  .button-primary {
    margin: 0;
    color: palette(primary);
    font-size: 14px;

    @include bp(m) {
      width: 60%;
      margin: $pad 0 0;
      font-size: 16px;
    }

    .survey-button-secondary{
      color: black;
      background-color: #fff;
      border: none;

      a.button::after{
        color: palette(primary);
        content: '\E90C';
      }
    }
  }

  &.button-centered {
    justify-content: center;
  }

  &.button-size-small {
    width: 100%;
    margin: 0;
    font-size: 10px;

    @include bp(m) {
      width: 40%;
      margin: $pad 0 0;
      font-size: 14px;
    }
  }

}

.icon {
  position: relative;
  display: inline;
  width: auto;
  margin: 0;
  overflow: visible;
  //margin-left: 5px;
  color: palette(primary);
  font-weight: 200;
  font-size: 1.25em;
  font-family: icomoon, sans-serif;
  line-height: 1;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: none;
  text-decoration: none;
  text-shadow: none;
  vertical-align: middle;
  background-color: transparent;
  border: 0;
  border-radius: 7px;
  outline: 0;
  cursor: pointer;
  transition: 0.2s ease-in-out all;
  appearance: none;
  -webkit-tap-highlight-color: rgb(0 0 0 / 0%);
  -webkit-font-smoothing: antialiased;

  &::after {
    content: '\E90C';
  }
}

a {
  font-size: 12px;

  @include bp(m) {
    font-size: 14px;
  }
}
</style>
