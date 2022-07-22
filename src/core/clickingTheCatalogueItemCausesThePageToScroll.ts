export let exportedDomNeeded: Element | undefined

function clickingTheCatalogueItemCausesThePageToScroll(
  currentAnchor: string,
  scannedDoms: Element[] | undefined
) {
  const domNeeded = scannedDoms?.find((dom) => dom.getAttribute('data-anchor') === currentAnchor)
  const domNeededGBCRTop = domNeeded?.getBoundingClientRect()?.top || 0
  document.documentElement.scrollTop = document.documentElement.scrollTop + domNeededGBCRTop
  exportedDomNeeded = domNeeded
}

export default clickingTheCatalogueItemCausesThePageToScroll
