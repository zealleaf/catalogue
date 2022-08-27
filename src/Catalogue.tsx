/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react'
import clickingTheCatalogueItemCausesThePageToScroll from '@/core/clickingTheCatalogueItemCausesThePageToScroll'
import scanner, { scannerReturn } from '@/core/scanner'
import useScroller from '@/core/useScroller'
import useMoveHorizontally from '@/core/useMoveHorizontally'
import { debounce } from '@/utils/debounce'

import styles from './Catalogue.module.css'

/* ===type=== */
interface propsData {
  contentMark: string
  contentLeft?: number
  isDebounce?: boolean
  scrollHash?: boolean
  scrollBehavior?: 'smooth' | 'auto'
  openMoveHorizontally?: boolean
  loadingDuration?: number
  diyLoadingStyle?: object
  diyLoadingChildren?: ReactElement
  diyWrapStyle?: object
  diyItemsStyle?: object
  diyActiveItemColor?: string
  diyActiveItemBorderColor?: string
}

interface catalogueItemData {
  tagType: string
  text: string
  paddingLeft: number
  anchor: string
}

const Catalogue: React.FC<propsData> = (props) => {
  const [catalogueItemList, setCatalogueItemList] = useState<catalogueItemData[]>([])
  const [currentAnchor, setCurrentAnchor] = useState<string>('')
  const [_, refreshPage] = useState<null>()
  const scanResultRef = useRef<scannerReturn>()
  const wrapRef = useRef<HTMLDivElement>(null)
  const activeAnchorRef = useRef<HTMLDivElement>(null)

  const clickFN = ([anchor]: string[]) => {
    window.__clickHadLetScrollTopChange__ = true
    location.hash = anchor
    clickingTheCatalogueItemCausesThePageToScroll(anchor, scanResultRef.current?.scannedDoms)
  }

  const clickFNDebounce = debounce(clickFN, 100)

  const handleActiveAnchorAndWrap = () => {
    const activeItemTop = activeAnchorRef.current?.offsetTop || 0
    if (wrapRef.current) {
      if (activeItemTop > 150) {
        wrapRef.current.scrollTop = activeItemTop - 150
      } else {
        wrapRef.current.scrollTop = 0
      }
    }
  }

  // Register rolling listening events
  useScroller({ isDebounce: props.isDebounce, scrollHash: props.scrollHash })
  // Process horizontal movement
  useMoveHorizontally({
    openMoveHorizontally: props.openMoveHorizontally || false,
    contentLeft: props.contentLeft || 20,
    contentMark: props.contentMark,
    catalogueMark: '#leafvein-catalogue-wrap'
  })

  // init
  useLayoutEffect(() => {
    // Scan main content And delay loading
    const scanResult = scanner(props.contentMark)
    setTimeout(() => {
      setCatalogueItemList(scanResult.result || [])
    }, props.loadingDuration || 1000)
    // Mount refreshPage to global object
    window.__refreshPage__ = refreshPage
    // Handle URL anchor loading page
    scanResultRef.current = scanResult
    clickFN([decodeURIComponent(location.hash)])
    // Process smooth scrolling
    document.documentElement.style.scrollBehavior = props.scrollBehavior || 'smooth'
    // handle active anchor and wrap
    setTimeout(() => {
      handleActiveAnchorAndWrap()
    }, 1050)
  }, [])

  // init anchor
  useEffect(() => {
    if (catalogueItemList.length) {
      setCurrentAnchor(decodeURIComponent(location.hash))
    }
  }, [catalogueItemList.length])

  // effect active item
  useEffect(() => {
    if (window.__currentAnchor__ !== '__$$reset$$__') setCurrentAnchor(window.__currentAnchor__)
    window.__currentAnchor__ = '__$$reset$$__'
  }, [window.__currentAnchor__])

  // handle active anchor and wrap
  useEffect(() => {
    handleActiveAnchorAndWrap()
  }, [activeAnchorRef.current])

  // if there is no have catalogue item list length
  if (!catalogueItemList.length) {
    return (
      <div
        className={styles.loadingWrap}
        style={{ ...props.diyLoadingStyle }}
        id="leafvein-catalogue-wrap"
      >
        {props.diyLoadingChildren ? props.diyLoadingChildren : '⌛️...'}
      </div>
    )
  }

  return (
    <div
      ref={wrapRef}
      className={styles.baseWrap}
      style={{ ...props.diyWrapStyle }}
      id="leafvein-catalogue-wrap"
    >
      {catalogueItemList.map((catalogueItem) => {
        return (
          <div
            ref={currentAnchor === catalogueItem.anchor ? activeAnchorRef : null}
            id="leafvein-catalogue-item"
            className={styles.baseItem}
            key={catalogueItem.anchor}
            data-active={currentAnchor === catalogueItem.anchor}
            style={{
              paddingLeft: 10 * catalogueItem.paddingLeft,
              color:
                currentAnchor === catalogueItem.anchor
                  ? `${props.diyActiveItemColor || '#0eda29'}`
                  : '#82808f',
              borderLeftColor:
                currentAnchor === catalogueItem.anchor
                  ? `${props.diyActiveItemBorderColor || '#0eda29'}`
                  : '#eef1ea',
              ...props.diyItemsStyle
            }}
            onClick={() => {
              clickFNDebounce(catalogueItem.anchor)
              setCurrentAnchor(catalogueItem.anchor)
            }}
            title={catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
          >
            {catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
          </div>
        )
      })}
    </div>
  )
}

export default Catalogue
