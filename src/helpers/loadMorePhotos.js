import { debounce } from './utils'

let loadMorePhotos

export const subscribeToLoadPhotos = (func, offset, ms) => {
  const handler = () => {
    if (document.body.offsetHeight - offset < window.scrollY + window.innerHeight) {
      func()
    }
  }
  loadMorePhotos = debounce(handler, ms = 300)
  window.addEventListener('scroll', loadMorePhotos)
}

export const unsubscribeToLoadPhotos = () => {
  window.removeEventListener('scroll', loadMorePhotos)
}


