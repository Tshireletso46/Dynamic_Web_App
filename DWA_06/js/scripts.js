
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'

let page = 1;
let matches = books

/**
 * Book preview
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

//show more button
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
document.querySelector('[data-list-items]').addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null
    for (const node of pathArray) {
        if (active) break
        if (node?.dataset?.preview) {
            let result = null
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            }
            active = result
        }
    }
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})














// Book preview
// document.querySelector('[data-list-items]').addEventListener('click', (event) => {
//     const pathArray = Array.from(event.path || event.composedPath())
//     let active = null
//     for (const node of pathArray) {
//         if (active) break
//         if (node?.dataset?.preview) {
//             let result = null
//             for (const singleBook of books) {
//                 if (result) break;
//                 if (singleBook.id === node?.dataset?.preview) result = singleBook
//             }
//             active = result
//         }
//     }
//     if (active) {
//         document.querySelector('[data-list-active]').open = true
//         document.querySelector('[data-list-blur]').src = active.image
//         document.querySelector('[data-list-image]').src = active.image
//         document.querySelector('[data-list-title]').innerText = active.title
//         document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
//         document.querySelector('[data-list-description]').innerText = active.description
//     }
// })


































// //@ts-check

// import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

// /**
//  * Represents a book.
//  * @typedef {Object} Book
//  * @property {string} author - The author of the book.
//  * @property {string} id - The ID of the book.
//  * @property {string} image - The URL of the book's image.
//  * @property {string} title - The title of the book.
//  */

// /** @type {number} */
// let page = 1;

// /** @type {Book[]} */
// let matches = books;

// /** @type {DocumentFragment} */
// const starting = document.createDocumentFragment();

// /**
//  * Create a preview element for a book.
//  * @param {Book} book - The book object.
//  * @returns {HTMLElement} - The created button element.
//  */
// function createPreviewElement(book) {
//   const { author, id, image, title } = book;

//   const element = document.createElement('button');
//   element.classList.add('preview');
//   element.setAttribute('data-preview', id);

//   element.innerHTML = `
//       <img
//           class="preview__image"
//           src="${image}"
//       />
      
//       <div class="preview__info">
//           <h3 class="preview__title">${title}</h3>
//           <div class="preview__author">${authors[author]}</div>
//       </div>
//   `;
//   return element;
// }

// // Display book previews
// for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
//   const element = createPreviewElement(book);
//   starting.appendChild(element);
// }

// const listItemsContainer = document.querySelector('[data-list-items]');
// if (listItemsContainer) {
//   listItemsContainer.appendChild(starting);
// }

// /**
//  * Create an option element for a genre.
//  * @param {string} id - The ID of the genre.
//  * @param {string} name - The name of the genre.
//  * @returns {HTMLOptionElement} - The created option element.
//  */
// function createGenreOption(id, name) {
//     const element = document.createElement('option');
//     element.value = id;
//     element.innerText = name;
//     return element;
//   }
  
//   /** @type {DocumentFragment} */
//   const genreHtml = document.createDocumentFragment();
  
//   // Create option element for 'All Genres'
//   const firstGenreElement = createGenreOption('any', 'All Genres');
//   genreHtml.appendChild(firstGenreElement);
  
//   // Create option elements for each genre
//   for (const [id, name] of Object.entries(genres)) {
//     const element = createGenreOption(id, name);
//     genreHtml.appendChild(element);
//   }
  
//   const searchGenresContainer = document.querySelector('[data-search-genres]');
//   if (searchGenresContainer) {
//     searchGenresContainer.appendChild(genreHtml);
//   }


// /**
//  * Create an option element for an author.
//  * @param {string} id - The ID of the author.
//  * @param {string} name - The name of the author.
//  * @returns {HTMLOptionElement} - The created option element.
//  */
// function createAuthorOption(id, name) {
//   const element = document.createElement('option');
//   element.value = id;
//   element.innerText = name;
//   return element;
// }

// /** @type {DocumentFragment} */
// const authorsHtml = document.createDocumentFragment();

// // Create option element for 'All Authors'
// const firstAuthorElement = createAuthorOption('any', 'All Authors');
// authorsHtml.appendChild(firstAuthorElement);

// // Create option elements for each author
// for (const [id, name] of Object.entries(authors)) {
//   const element = createAuthorOption(id, name);
//   authorsHtml.appendChild(element);
// }

// const searchAuthorsContainer = document.querySelector('[data-search-authors]');
// if (searchAuthorsContainer) {
//   searchAuthorsContainer.appendChild(authorsHtml);
// }

// /**
//  * 
//  */

// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     const settingsThemeElement = document.querySelector('[data-settings-theme]');
//     if (settingsThemeElement instanceof HTMLSelectElement) {
//       settingsThemeElement.value = 'night';
//     }
//     document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//     document.documentElement.style.setProperty('--color-light', '10, 10, 20');
//   } else {
//     const settingsThemeElement = document.querySelector('[data-settings-theme]');
//     if (settingsThemeElement instanceof HTMLSelectElement) {
//       settingsThemeElement.value = 'day';
//     }
//     document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//     document.documentElement.style.setProperty('--color-light', '255, 255, 255');
//   }
  
//   const listButton = document.querySelector('[data-list-button]');
//   if (listButton instanceof HTMLButtonElement) {
//     const remainingCount = matches.length - (page * BOOKS_PER_PAGE);
//     listButton.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
//     listButton.disabled = remainingCount > 0;
  
//     listButton.innerHTML = `
//       <span>Show more</span>
//       <span class="list__remaining"> (${remainingCount > 0 ? remainingCount : 0})</span>
//     `;
//   }
  
//   const searchCancelElement = document.querySelector('[data-search-cancel]');
//   if (searchCancelElement instanceof HTMLElement) {
//     searchCancelElement.addEventListener('click', () => {
//       const searchOverlayElement = document.querySelector('[data-search-overlay]');
//       if (searchOverlayElement instanceof HTMLDialogElement) {
//         searchOverlayElement.open = false;
//       }
//     });
//   }
  
//   const settingsCancelElement = document.querySelector('[data-settings-cancel]');
//   if (settingsCancelElement instanceof HTMLElement) {
//     settingsCancelElement.addEventListener('click', () => {
//       const settingsOverlayElement = document.querySelector('[data-settings-overlay]');
//       if (settingsOverlayElement instanceof HTMLDialogElement) {
//         settingsOverlayElement.open = false;
//       }
//     });
//   }
  
//   const headerSearchElement = document.querySelector('[data-header-search]');
//   if (headerSearchElement instanceof HTMLElement) {
//     headerSearchElement.addEventListener('click', () => {
//       const searchOverlayElement = document.querySelector('[data-search-overlay]');
//       if (searchOverlayElement instanceof HTMLDialogElement) {
//         searchOverlayElement.open = true;
//         const searchTitleElement = document.querySelector('[data-search-title]');
//         if (searchTitleElement instanceof HTMLElement) {
//           searchTitleElement.focus();
//         }
//       }
//     });
//   }
  
//   const headerSettingsElement = document.querySelector('[data-header-settings]');
//   if (headerSettingsElement instanceof HTMLElement) {
//     headerSettingsElement.addEventListener('click', () => {
//       const settingsOverlayElement = document.querySelector('[data-settings-overlay]');
//       if (settingsOverlayElement instanceof HTMLDialogElement) {
//         settingsOverlayElement.open = true;
//       }
//     });
//   }
  
//   const listCloseElement = document.querySelector('[data-list-close]');
//   if (listCloseElement instanceof HTMLElement) {
//     listCloseElement.addEventListener('click', () => {
//       const listActiveElement = document.querySelector('[data-list-active]');
//       if (listActiveElement instanceof HTMLDialogElement) {
//         listActiveElement.open = false;
//       }
//     });
//   }

//   /**
//    * 
//    */



// /**
//  * Handles the submit event of the settings form.
//  * @param {Event} event - The submit event.
//  */
// function handleSettingsFormSubmit(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const { theme } = Object.fromEntries(formData);

//   if (theme === 'night') {
//     document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
//     document.documentElement.style.setProperty('--color-light', '10, 10, 20');
//   } else {
//     document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
//     document.documentElement.style.setProperty('--color-light', '255, 255, 255');
//   }

//   const settingsOverlayElement = document.querySelector('[data-settings-overlay]');
//   if (settingsOverlayElement) {
//     settingsOverlayElement.setAttribute('open', 'false');
//   }
// }

// /**
//  * Handles the submit event of the search form.
//  * @param {Event} event - The submit event.
//  */
// function handleSearchFormSubmit(event) {
//   event.preventDefault();
//   const formData = new FormData(event.target);
//   const filters = Object.fromEntries(formData);
//   const result = [];

//   for (const book of books) {
//     let genreMatch = filters.genre === 'any';

//     for (const singleGenre of book.genres) {
//       if (genreMatch) break;
//       if (singleGenre === filters.genre) {
//         genreMatch = true;
//       }
//     }

//     if (
//       (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
//       (filters.author === 'any' || book.author === filters.author) &&
//       genreMatch
//     ) {
//       result.push(book);
//     }
//   }

//   page = 1;
//   matches = result;

//   const listMessageElement = document.querySelector('[data-list-message]');
//   if (listMessageElement) {
//     if (result.length < 1) {
//       listMessageElement.classList.add('list__message_show');
//     } else {
//       listMessageElement.classList.remove('list__message_show');
//     }
//   }

//   const listItemsElement = document.querySelector('[data-list-items]');
//   if (listItemsElement) {
//     listItemsElement.innerHTML = '';
//     const newItems = document.createDocumentFragment();

//     for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
//       const element = document.createElement('button');
//       element.classList = 'preview';
//       element.setAttribute('data-preview', id);

//       element.innerHTML = `
//         <img
//           class="preview__image"
//           src="${image}"
//         />
        
//         <div class="preview__info">
//           <h3 class="preview__title">${title}</h3>
//           <div class="preview__author">${authors[author]}</div>
//         </div>
//       `;

//       newItems.appendChild(element);
//     }

//     listItemsElement.appendChild(newItems);
//   }

//   const listButtonElement = document.querySelector('[data-list-button]');
//   if (listButtonElement) {
//     listButtonElement.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;

//     listButtonElement.innerHTML = `
//       <span>Show more</span>
//       <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
//     `;
//   }

//   window.scrollTo({ top: 0, behavior: 'smooth' });

//   const searchOverlayElement = document.querySelector('[data-search-overlay]');
//   if (searchOverlayElement) {
//     searchOverlayElement.setAttribute('open', 'false');
//   }
// }

// // Attach event listeners
// const settingsFormElement = document.querySelector('[data-settings-form]');
// if (settingsFormElement) {
//   settingsFormElement.addEventListener('submit', handleSettingsFormSubmit);
// }

// const searchFormElement = document.querySelector('[data-search-form]');
// if (searchFormElement) {
//   searchFormElement.addEventListener('submit', handleSearchFormSubmit);
// }

// /**
//  * 
//  */
// document.querySelector('[data-list-button]').addEventListener('click', () => {
//     const fragment = document.createDocumentFragment()

//     for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
//         const element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)
    
//         element.innerHTML = `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[author]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }

//     document.querySelector('[data-list-items]').appendChild(fragment)
//     page += 1
// })

// /**
//  * Handles the click event on the list items.
//  * @param {MouseEvent} event - The click event.
//  */
// function handleListItemClick(event) {
//     const pathArray = Array.from(event.path || event.composedPath());
//     let active = null;

//     for (const node of pathArray) {
//         if (active) break;

//         if (node && node.dataset && node.dataset.preview) {
//             let result = null;

//             for (const singleBook of books) {
//                 if (result) break;
//                 if (singleBook.id === node.dataset.preview) result = singleBook;
//             }

//             active = result;
//         }
//     }

//     if (active) {
//         const listActiveElement = document.querySelector('[data-list-active]');
//         if (listActiveElement instanceof HTMLElement) {
//             listActiveElement.open = true;
//             const listBlurElement = document.querySelector('[data-list-blur]');
//             if (listBlurElement instanceof HTMLImageElement) {
//                 listBlurElement.src = active.image;
//             }
//             const listImageElement = document.querySelector('[data-list-image]');
//             if (listImageElement instanceof HTMLImageElement) {
//                 listImageElement.src = active.image;
//             }
//             const listTitleElement = document.querySelector('[data-list-title]');
//             if (listTitleElement instanceof HTMLElement) {
//                 listTitleElement.innerText = active.title;
//             }
//             const listSubtitleElement = document.querySelector('[data-list-subtitle]');
//             if (listSubtitleElement instanceof HTMLElement) {
//                 listSubtitleElement.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
//             }
//             const listDescriptionElement = document.querySelector('[data-list-description]');
//             if (listDescriptionElement instanceof HTMLElement) {
//                 listDescriptionElement.innerText = active.description;
//             }
//         }
//     }
// }

// // Attach the event listener to the list items
// const listItemsElement = document.querySelector('[data-list-items]');
// if (listItemsElement instanceof HTMLElement) {
//     listItemsElement.addEventListener('click', handleListItemClick);
// }