class MyListComponent extends HTMLElement {
    constructor() {
        super();

    connectedCallback() {
        this.addEventListener('click', this.handleClick)
    }
    }
}

document.querySelector('[data-list-active]').open = true
                document.querySelector('[data-list-blur]').src = active.image
                document.querySelector('[data-list-image]').src = active.image
            document.querySelector('[data-list-title]').innerText = active.title
            document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
            document.querySelector('[data-list-description]').innerText = active.description
