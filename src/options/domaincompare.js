function * reverseIterateParts (domain) {
  let currentEnd = domain.length
  for (let index = currentEnd - 1; index >= -1; index--) {
     
    if (index == -1 || domain[index] == '.') {
      yield domain.substring(index + 1, currentEnd)
      currentEnd = index
    }
  }
}

export function domainCompare (domainA, domainB) {
  const partsOfA = reverseIterateParts(domainA)
  const partsOfB = reverseIterateParts(domainB)

  while (true) {
    const partA = partsOfA.next()
    const partB = partsOfB.next()

    if (partA.done) {
      if (partB.done) {
        return 0
      }
      return -1
    }
    if (partB.done) {
      return 1
    }
    if (partA.value > partB.value) {
      return 1
    }
    if (partA.value < partB.value) {
      return -1
    }
  }
}
