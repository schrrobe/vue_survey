export default {
  updateState: (state, newState) => {
    Object.assign(state, newState);
  },
  setLocale: (state, value) => {
    state.locale = value;
  },
  setDelay: (state, value) => {
    state.delay = value;
  },
};
