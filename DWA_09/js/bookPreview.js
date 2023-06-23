import { previewBooks } from "./script";
//custom elements
class BookPreview extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
              .preview:hover {
                background: rgba(var(--color-blue), 0.05);
              }
              .preview__info {
                padding: 1rem;
              }
              .preview__title {
                margin: 0 0 0.5rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
              }
              .preview__author {
                color: rgba(var(--color-dark), 0.4);

                .preview {
                    padding: 1rem;
                  }
                }
                
                .preview_hidden {
                  display: none;
                }
              }
          }
        </style>
        <div data-list-items class="preview">
      <div class="overlay__preview" class="preview__image"><img class="overlay__blur" data-list-blur src=""/><img class="overlay__image" data-list-image src=""/></div>
      <div class="overlay__content">
        <h3 class="overlay__title" data-list-title></h3>
        <div class="overlay__data" data-list-subtitle></div>
        <p class="overlay__data overlay__data_secondary" data-list-description></p>
      </div>
      `;
    }
    connectedCallback() {
      this.addEventListener('click', this.handlePreviewClick.bind(this));
    }
    disconnectedCallback() {
      this.removeEventListener('click', this.handlePreviewClick.bind(this));
    }
    handlePreviewClick(event) {
      const pathArray = Array.from(event.path || event.composedPath());
      let active = null;
      for (const node of pathArray) {
        if (active) break;
        if (node?.dataset?.preview) {
          let result = null;
          for (const singleBook of books) {
            if (result) break;
            if (singleBook.id === node?.dataset?.preview) result = singleBook;
          }
          active = result;
        }
      }
    }
}
previewBooks();