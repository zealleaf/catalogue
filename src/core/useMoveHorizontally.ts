import { useEffect } from 'react'

interface movePropsData {
  openMoveHorizontally: true
  contentLeft: number
  contentMark: string
  catalogueMark: string
}

const event_moveCallBack = (props: movePropsData) => {
  const contentDOM: HTMLDivElement | null = document.querySelector(props.contentMark)
  const catalogueDOM: HTMLDivElement | null = document.querySelector(props.catalogueMark)
  const left = (contentDOM?.offsetLeft || 0) + (contentDOM?.offsetWidth || 0)

  if (catalogueDOM?.style) {
    catalogueDOM.style.left = left + props.contentLeft + 'px'
  }
}

function useMoveHorizontally(props: movePropsData) {
  if (props.openMoveHorizontally) {
    event_moveCallBack(props)

    useEffect(() => {
      window.addEventListener('resize', event_moveCallBack.bind(null, props))
      return () => {
        window.removeEventListener('resize', event_moveCallBack.bind(null, props))
      }
    }, [])
  }
}

export default useMoveHorizontally
