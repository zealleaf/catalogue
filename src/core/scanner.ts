export interface scannerReturn {
  result: {
    anchor: string
    paddingLeft: number
    tagType: string
    text: string
  }[]
  scannedDoms: Element[] | undefined
}

const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// scanner
// Scan page content for directory data
function scanner(contentMark: string): scannerReturn {
  let result = []

  // step1
  for (const tag of tags) {
    const selector = contentMark + ' ' + tag
    const selectedDomList$1 = [...document.querySelectorAll(selector)]
    selectedDomList$1.forEach((dom) => {
      dom.setAttribute('data-selected', 'true')
    })
  }

  // step2
  const selectedDomList$2 = [...document.querySelectorAll("[data-selected='true']")]

  // step3
  const map = new Map()
  let letHashPayloadIndex = false
  selectedDomList$2.forEach((item) => {
    if (map.has(item.innerHTML)) {
      letHashPayloadIndex = true
      return
    } else {
      map.set(item.innerHTML, 1)
    }
  })

  // step4
  result = selectedDomList$2.map((selectedDom, index) => {
    if (letHashPayloadIndex) {
      selectedDom.setAttribute('data-anchor', '#' + selectedDom.innerHTML + '-' + (index + 1))
    } else {
      selectedDom.setAttribute('data-anchor', '#' + selectedDom.innerHTML)
    }
    return {
      anchor: selectedDom.getAttribute('data-anchor') || '',
      paddingLeft: Number(selectedDom.tagName.replace('H', '')),
      tagType: selectedDom.tagName,
      text: selectedDom.innerHTML
    }
  })

  return { result, scannedDoms: selectedDomList$2 }
}

export default scanner
