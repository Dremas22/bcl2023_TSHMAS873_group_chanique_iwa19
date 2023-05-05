
const createPreview = ({ author, id, image, title }) => {
    const preview = document.createElement('button');
    preview.classList = 'preview';
    preview.setAttribute('data-preview', id);
  
    preview.innerHTML = /* html */ `
      <img class="preview__image" src="${image}" alt="${title}">
      <div class="preview__content">
        <h2 class="preview__title">${title}</h2>
        <h3 class="preview__author">${author}</h3>
      </div>
    `;
  
    return preview;
  };
  
  let fragment = document.createDocumentFragment();
  let extracted = matches.slice(range[0], range[1]);
  
  for (const { author, image, title, id } of extracted) {
    const preview = createPreview({
      author,
      id,
      image,
      title,
    });
  
    fragment.appendChild(preview);
  }



const genresFragment = document.createDocumentFragment()
let element = document.createElement('option')
element.value = 'any'
element.innerText = 'All Genres'
genresFragment.appendChild(element)

for (const [id, name] of Object.entries(genres)) {
    let element = document.createElement('option')
    element.value = id
    element.innerText = name
    genresFragment.appendChild(element)
}

searchGenre.appendChild(genresFragment)

const authorsFragment = document.createDocumentFragment()
let element2 = document.createElement('option')
element2.value = 'any'
element2.innerText = 'All Authors'
authorsFragment.appendChild(element2)

for (const [id, name] of Object.entries(authors)) {
    let element2 = document.createElement('option')
    element2.value = id
    element2.innerText = name
    authorsFragment.appendChild(element2)
}

searchAuthor.appendChild(authorsFragment)



settingsTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';
const v = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

if (settingsTheme.value === 'night') {
  document.documentElement.style.setProperty('--color-dark', css['night'].dark);
  document.documentElement.style.setProperty('--color-light', css['day'].light);
}

if (v === 'night') {
  document.documentElement.style.setProperty('--color-dark', css['night'].dark);
  document.documentElement.style.setProperty('--color-light', css['day'].light);
}

settingsOverlay.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = Object.fromEntries(formData);
  document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
  document.documentElement.style.setProperty('--color-light', css[result.theme].light);
  settingsOverlay.open = false;
});



listBtn.innerText = `Show more (${books.length - [page * BOOKS_PER_PAGE]})`

listBtn.innerHTML = /* html */ [
    `<span>Show more</span>
    <span class="list__remaining"> (${matches.length - [page * BOOKS_PER_PAGE] > 0 ? matches.length - [page * BOOKS_PER_PAGE] : 0})</span>`,
]


listBtn.addEventListener('click', () => {
  const startIndex = page * BOOKS_PER_PAGE;
  const endIndex = (page + 1) * BOOKS_PER_PAGE;
  const fragment = document.createDocumentFragment();

  for (let i = startIndex; i < endIndex && i < matches.length; i++) {
    const book = matches[i];
    const { author, image, title, id } = book;

    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
      <img class="preview__image" src="${image}">
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;

    fragment.appendChild(element);
  }

  items.appendChild(fragment);

  page++;

  const remaining = matches.length - endIndex;
  listBtn.disabled = endIndex >= matches.length;
  listBtn.textContent = `Show more (${remaining})`;
});



searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(searchForm);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (let i = 0; i < matches.length; i++) {
    const book = matches[i];

    const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch = filters.author === 'any' || book.author === filters.author;
    const genreMatch = filters.genre === 'any' || book.genres.includes(filters.genre);

    if (titleMatch && authorMatch && genreMatch) {
      result.push(book);
    }
  }
  
  const dataListMessage = document.querySelector('[data-list-message]');

  if (result.length < 1) {
    dataListMessage.classList.add('list__message_show');
    items.innerHTML = '';
  } else {
    dataListMessage.classList.remove('list__message_show');
    items.innerHTML = '';
      
    const fragment = document.createDocumentFragment();
      
    for (const book of result) {
      const { author, image, title, id } = book;
      
      const element = document.createElement('button');
      element.classList = 'preview';
      element.setAttribute('data-preview', id);
    
      element.innerHTML = `
        <img class="preview__image" src="${image}">
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;
      
      fragment.appendChild(element);
    }
      
    items.appendChild(fragment);
  }

  searchOverlay.open = false;
  listBtn.disabled = true

});

fragment = document.createDocumentFragment()
extracted = books.slice(0, 36)
    
for (const { author, image, title, id } of extracted) {
  //const { author: authorId, id, image, title } = props
        
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
    
  items.appendChild(fragment)


const div = document.querySelector('.header__logo');

  div.addEventListener('click', () => {
    
    items.innerHTML = ''; 
    listBtn.disabled = false
    for (const { author, image, title, id } of extracted) {
      //const { author: authorId, id, image, title } = props
            
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

        items.appendChild(fragment)
        
  });





items.addEventListener('click', (event) => {
  listActive.open = true;

  let pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;
    const previewId = node?.dataset?.preview;
    console.log(previewId)
    for (const singleBook of matches) {
      if (singleBook.id === previewId) {
        active = singleBook;
        break;
      }
    }
  }

  if (!active) return;
  listImage.setAttribute('src', active.image)
  listBlur.style.backgroundImage = `url(${active.image})`;
  listTitle.textContent = active.title;
  listSubtitle.textContent = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
  listDescription.textContent = active.description;
});


listClose.addEventListener('click', (event)=>{

  listActive.close = true

})



// Listeners

searchCancel.addEventListener('click', () => { searchOverlay.open = false })
settingsCancel.addEventListener('click', () => { settingsOverlay.open = false })
headerSettings.addEventListener('click', () => { settingsOverlay.open = true })
settingsForm.addEventListener('submit', () => { settings.submit })
listClose.addEventListener('click', () => { listActive.open = false })
headerSearch.addEventListener('click', () => { searchOverlay.open = true ; searchTitle.focus(); })