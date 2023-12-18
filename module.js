import AbstractModule from '@joinmedia/jbs-core/source/AbstractModule';
import { createApp } from './source/app';

export default class VueUserSurvey extends AbstractModule {
  constructor(element, config) {
    super(element, config);
    this.element = element;
  }

  run() {
    if (localStorage.getItem('aySurveyModalShown') === 'yes') return;
    const { app } = createApp(this.config);
    app.$mount(this.element);
  }
}
