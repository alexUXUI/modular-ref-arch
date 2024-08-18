import { html, css, LitElement } from 'lit';

export class PluginElement extends LitElement {
  static styles = css`
    .content h1 {
      font-size: 3.6rem;
      font-weight: 700;
    }
  `;

  render() {
    return html`
      <div class="content">
        <h1>Plugin</h1>
      </div>
    `;
  }
}

// customElements.define('plugin-element', PluginElement);
