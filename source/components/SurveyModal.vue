<template>
  <div
    class="modal"
    :class="{
      'modal--full': full,
    }"
  >
    <div
      v-if="closable"
      class="m-actions"
    >
      <div class="logo logo--primary">
        <a
          data-tracking-id="btn_nav_ay_logo"
          href="/">
          <img
            src="@img/logo-ayyildiz.svg?url"
            alt="Logo Mobilfunkanbieter AY YILDIZ"
            title="Dein Mobilfunkanbieter für Deutschland und die Türkei"
          />
        </a>
      </div>
      <button
        type="button"
        class="m-close"
        @click="$emit('close')"
      >
        <span
          class="icon"
          data-test-id="survey-modal-close" />
      </button>
    </div>

    <slot name="beforeContent" />

    <div class="m-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurveyModal',
  props: {

    closable: {
      type: Boolean,
      default: true,
    },

    loading: {
      type: Boolean,
    },

    small: {
      type: Boolean,
    },

    medium: {
      type: Boolean,
    },

    large: {
      type: Boolean,
    },

    full: {
      type: Boolean,
    },

    fixed: {
      type: Boolean,
    },

    overlay: {
      type: Boolean,
    },

  },
};
</script>

<style lang="scss" scoped>
$pad: 20px;

.modal {
  position: relative;
  display: block;
  width: 100%;
  max-width: 700px;
  margin: 20% auto auto;
  background-color: palette(white);
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 color.change(palette(black), $alpha: .15);
  transition: all .3s ease-in-out;

  @include bp(m) {
    margin: 160px auto auto;
  }

  .m-actions {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;

    @include bp(m) {
      padding: 10px;
    }
  }

  .m-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    color: palette(primary);
    font-size: 30px;
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;

    .icon::after{
      font-family: icomoon, sans-serif;
      content: '\e90f';
    }
  }

  .m-content {
    padding: 0;

    @include bp(m) {
      padding: 10px;
    }

    .modal-header {
      min-height: 40px;
      margin-bottom: 25px;

      .headline {
        font-weight: 900;
        font-family: font(secondary);
      }
    }
  }

  &.modal--full {
    position: absolute;
    width: 100%;
    min-height: 100%;
    border-radius: 0;

    @include bp(m, max) {
      max-width: none;
    }

    @include bp(m) {
      position: relative;
      min-height: auto;
      border-radius: 20px;
    }
  }

  &.modal--fixed {
    position: fixed;
    top: 0;
    left: 50%;
    height: 100%;
    transform: translateX(-50%);

    @include bp(m) {
      height: auto;
    }

    .m-content {
      height: calc(100% - 100px);
    }
  }

  &.modal--overlay {
    z-index: 110;
    margin-top: 0;
  }
}
</style>
