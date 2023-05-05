import { authors, genres, books, BOOKS_PER_PAGE } from './data.js'

let matches = books;
let page = 1;
let range = [0, 36];

if (!books && !Array.isArray(books)) throw new Error('Source required')
if (!range && range.length < 2) throw new Error('Range must be an array with two numbers')

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

const listItems = document.querySelector('[data-list-items]')
// listItems.addEventListener('click', () => {
//     document.querySelector('[data-list-active]').open = true
// })
// const listItems = document.querySelector('[data-list-items]')
function createPreview({ author, id, image, title }) {
    const previewDiv = document.createElement('div');
    previewDiv.classList.add('preview');
    const preview = document.querySelector('[data-list-active]');
    preview.setAttribute('src', id)
    preview.innerHTML = `<img class="preview__image" src=${image} alt=${title}>
    <div class="preview__content">
    <h3 class="preview__title">${title}</h3>
    <div class="preview__author">${author}</div>
    </div>`

    return preview
}



// function createPreview({ author, id, image, title }) {

//     //const preview = document.querySelector('[data-list-active]');
//     const preview = document.createElement('button');
//     preview.classList.add('preview');
//     preview.setAttribute('src', id);

//     const previewImage = document.createElement('img');
//     previewImage.classList.add('preview__image');
//     previewImage.setAttribute('src', image);
//     previewImage.setAttribute('alt', title);
//     preview.appendChild(previewImage);

//     const previewContent = document.createElement('div');
//     previewContent.classList.add('preview__content');
//     preview.appendChild(previewContent);

//     const previewTitle = document.createElement('h3');
//     previewTitle.classList.add('preview__title');
//     previewTitle.textContent = title;
//     previewContent.appendChild(previewTitle);

//     const previewAuthor = document.createElement('div');
//     previewAuthor.classList.add('preview__author');
//     previewAuthor.textContent = author;
//     previewContent.appendChild(previewAuthor);

//     preview.addEventListener('click', () => {
//         document.querySelector('.preview__info').open = true;
//        

//     });

//     return preview;
// }


let extracted = books.slice(0, 36)
//let fragment = document.createDocumentFragment()

//const listItems = document.querySelector('[data-list-items]');
let fragment = document.createDocumentFragment();

// for (const { author, id, image, title } of extracted) {
//     const preview = createPreview({ author, id, image, title });
//     listItems.appendChild(preview);
//     fragment.appendChild(preview);
// }

// listItems.appendChild(fragment);


for (const { author, image, title, id } of extracted) {
    const fragment = document.createDocumentFragment()
    const listItems = document.querySelector('[data-list-items]')
    let preview = createPreview({
        author,
        id,
        image,
        title
    })
    fragment.appendChild(preview)
    listItems.appendChild(fragment)
}

// listItems.addEventListener('click', (e) => {
//     e.preventDefault()
//     document.querySelector('[data-list-active]').open = true;
// })



const genresFrag = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genresFrag.appendChild(element);

for (const [id, name] of Object.entries(genres)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genresFrag.appendChild(element);
}

const searchGenre = document.querySelector('[data-search-genres]');
searchGenre.appendChild(genresFrag);

const authorsFrag = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorsFrag.appendChild(element);
for (const [id, name] of Object.entries(authors)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsFrag.appendChild(element);
}
const searchAuthors = document.querySelector('[data-search-authors]');
searchAuthors.appendChild(authorsFrag);

const theme = document.querySelector('[data-settings-theme]')
theme.value === window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${day.dark})`).matches ? 'night' : 'day'
let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'

theme.style.setProperty('--color-dark', [v].dark);
theme.style.setProperty('--color-light', [v].light);

const listBtn = document.querySelector('[data-list-button]')
listBtn.textContent = `Show more: ${(books.length - BOOKS_PER_PAGE)}`
listBtn.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

listBtn.innerHTML = /* html */ `[
    <span>Show more</span>,
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>
]`



const cancelSearch = document.querySelector('[data-search-cancel]')
cancelSearch.addEventListener('click', () => {

    document.querySelector('[data-search-overlay]').open = false
})

const cancelSett = document.querySelector('[data-settings-cancel]')
cancelSett.addEventListener('click', () => {
    document.querySelect('[data-settings-overlay]').open = false
});

const settForm = document.querySelector('[data-settings-form]')
settForm.addEventListener('submit', () => {
    document.querySelector('[data-settings-overlay]').open = true
});

// const closeList = document.querySelector('[data-list-close]')
// closeList.addEventListener('click', () => {
//     document.querySelector('[data-list-active]').open = false

// })

const displayPreview = document.querySelector('[data-list-active]')
listItems.addEventListener('click', () => {
    displayPreview.open = true
})


listBtn.addEventListener('click', () => {
    listItems.appendChild(createPreviewsFragment(matches, page * BOOKS_PER_PAGE, `${page + 1}` * [BOOKS_PER_PAGE]))
    actions.list.updateRemaining()
    page = page + 1
})

const searchData = document.querySelector('[data-header-search]')
searchData.addEventListener('click', () => {

    document.querySelector('[data-search-overlay]').open = true
    document.querySelector('[data-search-title]').focus();

});

const searchForm = document.querySelector('[data-search-form]')
searchForm.addEventListener('click', (filters, event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    filters = Object.fromEntries(formData)
    result = []

    for (const book of booksList) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author


        genreMatch = filters.genre = 'any'
        for (const singleGenre of book.genres) {

            if (singleGenre === filters.genre) {
                genreMatch = true
            }
        }
        if (titleMatch && authorMatch && genreMatch) {
            result.push(book)
        }

        if (display.length < 1) {
            const listMessage = document.querySelector('[data-list-message]')
            listMessage.classList.add('list__message_show')
        }
        else {
            listMessage.classList.remove('list__message_show')
        }
    }

});


fragment = document.createDocumentFragment()
for (const { author, id, image, title } of extracted) {

    const element = document.createElement('button')
    element.classList = 'preview'
    element.setAttribute('data-preview', id)
    element.innerHTML = /* html */ `
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
listItems.appendChild(fragment)


const initial = matches.length - (page * BOOKS_PER_PAGE);
const hasRemaining = initial > 0;
const remaining = hasRemaining ? initial : 0;
listBtn.disabled = remaining === 0;

listBtn.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (${remaining})</span>
    `

window.scrollTo({ top: 0, behavior: 'smooth' });

searchData.open = false


const submitSett = document.querySelector('[form="settings"]')
submitSett.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const result = Object.fromEntries(formData)
    document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
    document.documentElement.style.setProperty('--color-light', css[result.theme].light);
    document.querySelector('[data-settings-overlay]').open === false
})


//const listItems = document.querySelector('[form="settings"]')
listItems.addEventListener('submit', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null;
    for (const node of pathArray) {
        if (active) {
            break;
        }
        for (const singleBook of books) {
            let previewId = node?.dataset?.preview
            if (singleBook.id === previewId) active = singleBook
            break;
        }

    }
    if (!active) return;

    imageList = active.image
    previewData = `url(${image})`
    listTitle.textContent = active.title
    subtitle.textContent = `${authors[active.author]}(${new Date(active.published).getFullYear()})`;
    listDescription.textContent = active.description;

    



})


let previewData = document.querySelector('[data-list-active]')
const imageList = document.querySelector('[data-list-image]')
const listTitle = document.querySelector('[data-list-title]')
const subtitle = document.querySelector('[data-list-subtitle]')
const listDescription = document.querySelector('[data-list-description]')



// //imageList =  active.image
// // previewData = `url(${image})`
// // listTitle.textContent = active.title
// // subtitle.textContent = `${authors[active.author]}(${new Date(active.published).getFullYear()})`;
// // listDescription.textContent = active.description;

// const previewDiv = document.querySelector('.backdrop')
// const btnPreview = document.createElement('button');
// btnPreview.classList.add('preview');
// // btnPreview.setAttribute('src', active.image);

// const previewImage = document.createElement('img');
// previewImage.classList.add('preview__image');
// previewImage.setAttribute('src', image);
// previewImage.setAttribute('alt', title);
// previewImage.textContent = `url${active.image}`
// btnPreview.appendChild(previewImage);

// const previewContent = document.createElement('div');
// previewContent.classList.add('preview__content');
// btnPreview.appendChild(previewContent);

// const previewTitle = document.createElement('h3');
// previewTitle.classList.add('preview__title');
// previewTitle.textContent = active.title;
// previewContent.appendChild(previewTitle);

// previewDiv.appendChild(btnPreview)

