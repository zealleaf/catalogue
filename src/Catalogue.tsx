/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import clickingTheCatalogueItemCausesThePageToScroll from '@/core/clickingTheCatalogueItemCausesThePageToScroll'
import scanner, { scannerReturn } from '@/core/scanner'
import scroller from '@/core/scroller'
import moveHorizontally from '@/core/moveHorizontally'
import { debounce } from '@/utils/debounce'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

/* ===type=== */
interface propsData {
  contentMark: string
  scrollHash?: boolean
  diyWrapStyle?: string
  diyItemStyle?: string
  scrollBehavior?: 'smooth' | 'none'
  openMoveHorizontally?: boolean
  isDebounce?: boolean
  loadingDuration?: number
  diyLoadingStyle?: string
  diyLoadingChildren?: ReactJSXElement
}

interface catalogueItemData {
  tagType: string
  text: string
  paddingLeft: number
  anchor: string
}
/* ===styleValue=== */
const baseWrapSV = `
  width: 200px;
  font-size: 16px;
  text-align: start;
  position: fixed;
  top: 20px;
  right: 20px;
`
const baseItemSV = `
  cursor: pointer;
  border-left: solid 2px #eef1ea;
  transition: all 0.2s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  &:hover {
    color: black
  }
`
const Catalogue: React.FC<propsData> = (props) => {
  const [catalogueItemList, setCatalogueItemList] = useState<catalogueItemData[]>([])
  const [currentAnchor, setCurrentAnchor] = useState<string>('')
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
    // Register rolling listening events
    scroller({ isDebounce: props.isDebounce, scrollHash: props.scrollHash })
    // Handle URL anchor loading page
    scanResultRef.current = scanResult
    clickFN([decodeURIComponent(location.hash)])
    // Process horizontal movement
    if (props.openMoveHorizontally) {
      moveHorizontally({
        openMoveHorizontally: props.openMoveHorizontally || false,
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

  return (
    <>
      {catalogueItemList.length ? (
        <div css={css(baseWrapSV, props.diyWrapStyle)} id="leafvein-catalogue-wrap">
          {catalogueItemList.map((catalogueItem) => {
            return (
              <div
                className="leafvein-catalogue-item"
                key={catalogueItem.anchor}
                css={css(
                  baseItemSV,
                  {
                    paddingLeft: 10 * catalogueItem.paddingLeft
                  },
                  {
                    color:
                      currentAnchor === catalogueItem.anchor ? '#0eda29 !important' : '#888f80',
                    borderLeftColor: currentAnchor === catalogueItem.anchor ? '#0eda29' : '#eef1ea'
                  },
                  props.diyItemStyle
                )}
                onClick={() => debounce(clickFN, 100)(catalogueItem.anchor)}
                title={catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
              >
                {catalogueItem?.text?.replace(/<[^>]+>/g, '') || ''}
              </div>
            )
          })}
        </div>
      ) : (
        <div css={css(baseWrapSV, props.diyLoadingStyle)} id="leafvein-catalogue-wrap">
          {props.diyLoadingChildren ? props.diyLoadingChildren : '⌛️...'}
        </div>
      )}
    </>
  )
}

export default Catalogue
