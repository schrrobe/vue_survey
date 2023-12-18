<template>
  <div class="star-rating-input">
    <p><strong>{{ headline }}</strong></p>
    <div class="rating-box">
      <fieldset class="rating">
        <span class="star-cb-group">
          <template v-for="(entry, index) in data">
            <input
              :id="`${name}-${entry.id}`"
              :key="`${name}-${entry.id}-input`"
              v-model="rating"
              :class="highlighted(index)"
              type="radio"
              :name="`${name}-${entry.id}`"
              :value="entry.val" />
            <label
              :key="`${name}-${entry.id}-label`"
              :for="`${name}-${entry.id}`"
              @click="selectedIndex = index"
              @mouseenter="hoverIndex = index"
              @mouseleave="hoverIndex = null">
              {{ entry.id }}
              >
            </label>
          </template>
        </span>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: [
    'captionLowest',
    'captionHighest',
    'name',
    'headline',
    'data',
  ],
  data() {
    return {
      rating: null,
      selectedIndex: null,
      hoverIndex: null,
    };
  },
  computed: {

  },
  watch: {
    rating() {
      this.emitRating();
    },
  },
  mounted() {
  },
  created() {
  },
  methods: {
    highlighted(index) {
      if (this.hoverIndex !== null) {
        if (this.hoverIndex >= index) return 'highlighted';
      } else if (this.selectedIndex === index || index < this.selectedIndex) return 'highlighted';
      return '';
    },

    emitRating() {
      this.$emit('ratingChanged', this.rating);
    },
  },
};
</script>

<style scoped lang="scss">
$star-font-size: 30px;

.star-rating-input {
  width: 100%;
  margin: $pad 10px 10px 0;
  padding: 15px 20px 0;
  background: palette(grey, ultralight);
  border-radius: 5px;

  p {
    margin: 0 0 12px;
  }
}

.rating-box {
  width: max-content;
  padding-bottom: -15px;

  .rating {
    margin: 0;
  }
}

.star-cb-group {
  font-size: 0;

  * {
    font-size: 1rem;
  }

  > input {
    display: none;
  }

  /* inital */
  & > input + label {
    /* only enough room for the star */
    display: inline-block;
    width: 1em;
    overflow: hidden;
    font-size: $star-font-size;
    line-height: 1.5rem;
    white-space: nowrap;
    text-indent: 9999px;
    cursor: pointer;

    &::before {
      display: inline-block;
      color: #888;
      text-indent: -9999px;
      content: "☆";
    }
  }

  .highlighted + label::before{
    color: palette(primary);
    text-shadow: 0 0 1px #333;
    content: "★";
  }

  > .star-cb-clear + label {
    width: .5em;
    margin-left: -.5em;
    text-indent: -9999px;

    &::before {
      width: .5em;
    }
  }

}

sub {
     bottom: 20px;
   }

p {
  font-size: 80%;

  @include bp(m) {
    margin: 0 0 20px;
    font-size: 100%;
  }
}
</style>
