import { html, css, LitElement } from 'lit';

export class ViewerElement extends LitElement {
  static styles = css`
    .content h1 {
      font-size: 3.6rem;
    }
  `;

  render() {
    return html`
      <div class="content">
        <h1>Viewer - test!</h1>
        <plugin-element></plugin-element>
      </div>
    `;
  }
}
