import { ReactElement, useEffect, useRef, useState } from 'react'
import clickingTheCatalogueItemCausesThePageToScroll from '@/core/clickingTheCatalogueItemCausesThePageToScroll'
import scanner, { scannerReturn } from '@/core/scanner'
import scroller from '@/core/scroller'
import moveHorizontally from '@/core/moveHorizontally'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, refreshPage] = useState<null>()

  const scanResultRef = useRef<scannerReturn>()

  const clickFN = ([anchor]: string[]) => {
    window.__clickHadLetScrollTopChange__ = true
    window.__currentAnchor__ = anchor
    location.hash = anchor
    clickingTheCatalogueItemCausesThePageToScroll(anchor, scanResultRef.current?.scannedDoms)
  }

  // init
  useEffect(() => {
    // Process smooth scrolling
    document.documentElement.style.scrollBehavior = props.scrollBehavior || 'smooth'
    // Scan main content And delay loading
    const scanResult = scanner(props.contentMark)
    setTimeout(() => {
      setCatalogueItemList(scanResult.result || [])
    }, props.loadingDuration || 1000)
    // Mount refreshPage to global object
    window.__refreshPage__ = refreshPage
    // Register rolling listening events
    scroller({ isDebounce: props.isDebounce, scrollHash: props.scrollHash })
    // Handle URL anchor loading page
    scanResultRef.current = scanResult
    clickFN([decodeURIComponent(location.hash)])
    // Process horizontal movement
    if (props.openMoveHorizontally) {
      moveHorizontally({
        openMoveHorizontally: props.openMoveHorizontally || false,
        contentLeft: props.contentLeft || 20,
        contentMark: props.contentMark,
        catalogueMark: '#leafvein-catalogue-wrap'
      })
    }
  }, [])

  // effect active item
  useEffect(() => {
    if (window.__currentAnchor__ !== '__$$reset$$__') setCurrentAnchor(window.__currentAnchor__)
    window.__currentAnchor__ = '__$$reset$$__'
  }, [window.__currentAnchor__])
  console.log('props.diyActiveItemColor', props.diyActiveItemColor)
  return (
    <>
      {catalogueItemList.length ? (
        <div
          className={styles.baseWrap}
          style={{ ...props.diyWrapStyle }}
          id="leafvein-catalogue-wrap"
        >
          {catalogueItemList.map((catalogueItem) => {
            return (
              <div
                id="leafvein-catalogue-item"
                className={styles.baseItem}
                key={catalogueItem.anchor}
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
                onClick={() => debounce(clickFN, 100)(catalogueItem.anchor)}
                title={catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
              >
                {catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
              </div>
            )
          })}
        </div>
      ) : (
        <div
          className={styles.baseWrap}
          style={{ ...props.diyLoadingStyle }}
          id="leafvein-catalogue-wrap"
        >
          {props.diyLoadingChildren ? props.diyLoadingChildren : '⌛️...'}
        </div>
      )}
    </>
  )
}

export default Catalogue
