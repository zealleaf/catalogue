interface movePropsData {
  openMoveHorizontally: true
  contentLeft: number
  contentMark: string
  catalogueMark: string
}

const moveCallBack = (props: movePropsData) => {
  const contentDOM: HTMLDivElement | null = document.querySelector(props.contentMark)
  const catalogueDOM: HTMLDivElement | null = document.querySelector(props.catalogueMark)

  const left = (contentDOM?.offsetLeft || 0) + (contentDOM?.offsetWidth || 0)

  if (catalogueDOM?.style) {
    catalogueDOM.style.left = left + props.contentLeft + 'px'
  }
}

function moveHorizontally(props: movePropsData) {
  if (props.openMoveHorizontally) {
    moveCallBack(props)
    window.addEventListener('resize', moveCallBack.bind(null, props))
  }
}

export default moveHorizontally
