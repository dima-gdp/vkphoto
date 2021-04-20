let bodyOffsetTop

export const setBodyStyles = () => {
  let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px'
  document.body.style.paddingRight = paddingOffset
  bodyOffsetTop = window.scrollY
  document.body.classList.add('disable-scroll')
  document.body.style.top = -bodyOffsetTop + 'px'
}

export const restoreBodyStyles = () => {
  document.body.classList.remove('disable-scroll')
  window.scroll({ top: bodyOffsetTop })
  document.body.style.top = 'auto'
  document.body.style.paddingRight = ''
}
