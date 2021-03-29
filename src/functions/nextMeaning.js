const nextMeaning = (
  shownMeaningIndex,
  shownMeanings,
  setShownMeanigIndex
) => {
  let index = shownMeaningIndex
  let numberOfMeanings = shownMeanings.length
  if(shownMeaningIndex < numberOfMeanings-1){
    setShownMeanigIndex(index + 1)
  }
}

export default nextMeaning