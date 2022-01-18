export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
  }
  gerRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }
  enable() {
    this.refs.button.disabled = true;
  }
  show() {
    this.refs.button.classList.removed('is-hidden');
  }
  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
