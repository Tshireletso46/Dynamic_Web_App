import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
let page = 1;
let matches = books
/**
 * show books
 */
function displayBooks (limitBooks, fragment){
for (const { author, id, image, title } of limitBooks) {
    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)
    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    fragment.appendChild(element)
}
}
const starting = document.createDocumentFragment()
displayBooks(matches.slice(0, BOOKS_PER_PAGE), starting);
document.querySelector('[data-list-items]').appendChild(starting)
//search options
function searchOptions(option, firstSearch) {
    const searchHtml = document.createDocumentFragment()
    const optionElement = document.createElement('option')
    optionElement.value = 'any'
    optionElement.innerText = `All ${firstSearch}`
    searchHtml.appendChild(optionElement)
    for (const [id, name] of Object.entries(option)) {
        const element = document.createElement('option')
        element.value = id
        element.innerText = name
        searchHtml.appendChild(element)
    }
    return searchHtml
}
document.querySelector('[data-search-genres]').appendChild(searchOptions(genres, "Genres"))
document.querySelector('[data-search-authors]').appendChild(searchOptions(authors, "Authors"))
//settings
function day() {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
function night(){
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
}
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    night()
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
    day()
}
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)
    if (theme === 'night') {
        night()
    } else {
        day()
    }
    document.querySelector('[data-settings-overlay]').open = false
})
//show more books
document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) <= 0
document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
    displayBooks((matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)), fragment)
    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1
    document.querySelector('[data-list-button]').innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
})
//event listners for all buttons
document.querySelector('[data-search-cancel]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = false
})
 5
document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false
})
document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true
    document.querySelector('[data-search-title]').focus()
})
document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true
})-5
document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false
})
//this when the search button is clicked then the search books will be filtered based on the form
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []
    for (const book of books) {
        let genreMatch = filters.genre === 'any'
        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }
        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
            (filters.author === 'any' || book.author === filters.author) &&
            genreMatch
        ) {
            result.push(book)
        }
    }
    page = 1;
    matches = result
    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }
//display filtered books and create fragment to call function and append the fragment to the interface
    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment()
    displayBooks((result.slice(0, BOOKS_PER_PAGE)), newItems)
    document.querySelector('[data-list-items]').appendChild(newItems)
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `
    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false
})

//display book details
function handleListItemClick(event, books, authors) {
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
    if (active) {
      document.querySelector('[data-list-active]').open = true;
      document.querySelector('[data-list-blur]').src = active.image;
      document.querySelector('[data-list-image]').src = active.image;
      document.querySelector('[data-list-title]').innerText = active.title;
      document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(
        active.published
      ).getFullYear()})`;
      document.querySelector('[data-list-description]').innerText = active.description;
    }
  }
  
  // Usage example:
  const books = [{/* book objects */}];
  const authors = {/* author data */};
  const listItemsElement = document.querySelector('[data-list-items]');
  
  listItemsElement.addEventListener('click', (event) => {
    handleListItemClick(event, books, authors);
  });
  handleListItemClick()