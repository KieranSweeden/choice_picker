const tagsElement = document.getElementById('tags')
const textarea = document.getElementById('textarea')

// On page load, the textarea is focused on so user can type immediately
textarea.focus()

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value)

  if(e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = ''
    }, 10)
    randomSelect()
  }
})

function createTags(input) {
  // Make sure we filter out spaces within tags
  const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());
  tagsElement.innerHTML = '';

  tags.forEach(tag => {
    const tagElement = document.createElement('span')
    tagElement.classList.add('tag')
    tagElement.innerText = tag
    tagsElement.appendChild(tagElement)
  })
}

function randomSelect() {
  const times = 30

  const interval = setInterval(() => {
    const randomTag = pickRandomTag()

    highlightTag(randomTag)

    setTimeout(()=> {
      unhighlightTag(randomTag)
    }, 100)
  }, 100);

  setTimeout(() => {
    clearInterval(interval)

    setTimeout(() => {
      const randomTag = pickRandomTag()

      highlightTag(randomTag)
    }, 100)
  }, times * 100)
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
  tag.classList.add('highlight')
}

function unhighlightTag(tag) {
  tag.classList.remove('highlight')
}