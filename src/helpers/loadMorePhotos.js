import { debounce } from './utils'

export default class LoadMorePhotos {
  constructor (func, offset) {
    this.setHandlerScroll = () => {
      if (document.body.offsetHeight - offset < window.scrollY + window.innerHeight) {
        func()
      }
    }
    this.runToGetNextPhotos = debounce(this.setHandlerScroll, 300)
  }
  subscribe(){
    window.addEventListener('scroll', this.runToGetNextPhotos)
  }
  unsubscribe(){
    window.removeEventListener('scroll', this.runToGetNextPhotos)
  }
}

