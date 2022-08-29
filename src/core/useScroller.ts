/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect } from 'react'
import { debounce } from '@/utils/debounce'
import { throttle } from '@/utils/throttle'
import { exportedDomNeeded } from './clickingTheCatalogueItemCausesThePageToScroll'

type scrollHash = boolean

function findWhichDomMarginTopCloser(params: [scrollHash, any]) {
  const selectedDomList = [...document.querySelectorAll("[data-selected='true']")]
  const closerDom = selectedDomList.sort((a, b) => {
    return Math.abs(a.getBoundingClientRect().top) - Math.abs(b.getBoundingClientRect().top)
  })[0]

  // delay to show
  if (closerDom.getBoundingClientRect().top < 100) {
    const currentAnchor = closerDom?.getAttribute('data-anchor') || ''

    if (params[0]) {
      location.hash = currentAnchor
    }

    // Mount currentAnchor on the global object
    window.__currentAnchor__ = currentAnchor
    // Trigger update
    window.__refreshPage__(new Date().getTime())
  }
}

const findWhichDomMarginTopCloserDebounced = debounce(
  findWhichDomMarginTopCloser as () => unknown,
  50
)

const findWhichDomMarginTopCloserThrottled = throttle(
  findWhichDomMarginTopCloser as () => unknown,
  50
)

interface IScroller {
  isDebounce?: boolean
  scrollHash?: boolean
}

const DE = document.documentElement

const event_handleScroll = (isDebounce: boolean, scrollHash: boolean) => {
  const flag$1 = Math.abs(exportedDomNeeded?.getBoundingClientRect().top || 0) < 1
  const flag$2 = Math.abs(DE.scrollHeight - (DE.scrollTop + DE.clientHeight)) < 1

  if (window.__clickHadLetScrollTopChange__) {
    if (flag$1 || flag$2) {
      window.__clickHadLetScrollTopChange__ = false
    }
    return
  }

  if (!flag$2) {
    if (isDebounce) {
      findWhichDomMarginTopCloserDebounced(scrollHash)
    } else {
      findWhichDomMarginTopCloserThrottled(scrollHash)
    }
  }
}

function useScroller({ isDebounce = true, scrollHash = false }: IScroller) {
  useLayoutEffect(() => {
    window.addEventListener('scroll', event_handleScroll.bind(null, isDebounce, scrollHash))
    return () => {
      window.removeEventListener('scroll', event_handleScroll.bind(null, isDebounce, scrollHash))
    }
  }, [])
}

export default useScroller
