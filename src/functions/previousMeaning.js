const previousMeaning = (
  shownMeaningIndex,
  setShownMeanigIndex
) => {
  let index = shownMeaningIndex
  if(shownMeaningIndex > 0){
    setShownMeanigIndex(index - 1)
  }
}

export default previousMeaning