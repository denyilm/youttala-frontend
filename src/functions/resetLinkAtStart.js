const resetLinkAtStart = (linkAtStart, currentLink) => {
  if(linkAtStart === currentLink) {
    return linkAtStart + ''
  } else {
    return linkAtStart
  }
}

export default resetLinkAtStart