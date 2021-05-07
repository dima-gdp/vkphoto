import { debounce } from './utils'

let debounceWrapper
let loadMorePhotos

export const subscribeToLoadPhotos = (func, offset, ms = 300) => {
  debounceWrapper = debounce(func, ms)
  loadMorePhotos = () => {
    if (document.body.offsetHeight - offset < window.scrollY + window.innerHeight) {
      debounceWrapper()
    }
  }
  window.addEventListener('scroll', loadMorePhotos)
}

export const unsubscribeToLoadPhotos = () => {
  window.removeEventListener('scroll', loadMorePhotos)
}
