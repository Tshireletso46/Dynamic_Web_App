import { html, LitElement } from "../libs/lit-html.js";

export class Counter extends LitElement {
  static get properties() {
    return {
      count: { type: Number },
      
    };
  }

  constructor() {
    super();
    this.count = 0;
    const MAX_NUMBER = 15;
    const MIN_NUMBER = -5;
     const STEP_AMOUNT = 1;
  }

  setCount = count => {
    this.count = count;
  };

  render() {
    const { count } = this;
    return html`
       <sl-alert data-key="confirm" variant="success" duration="3000" closable >
            <sl-icon slot="icon" name="check2-circle"></sl-icon>
            <strong>Counter has been reset</strong><br />
        </sl-alert>
        <sl-input class="counter__value" data-key="number" readonly value="0"></sl-input>
        <div class="counter__actions">
          <sl-button variant="neutral"  @click=${() => this.setCount(count - 1)} >-</sl-button>
          <sl-button variant="neutral" class="counter__button counter__button_first" @click=${() => this.setCount(count + 1)} >+</sl-button>
          <sl-button variant="neutral" class="counter__button" @click=${() => this.setCount(count = 0)} size="large">Reset</sl-button>
        </div>
    `;
  }
}

customElements.define('my-counter', Counter)