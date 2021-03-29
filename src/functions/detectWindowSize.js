const detectWindowSize = (size, setWidth, setHeight) => {
  if(window.innerWidth < 370) {
    //iPhone 5
    setWidth('310px')
    setHeight('200px')
  } else if(window.innerWidth < 415) {
    //iPhone 6/7/8
    setWidth('368px')
    setHeight('207px')
  } else if(window.innerWidth < 500) {
    //smaller screen and iPhone Plus
    setWidth('368px')
    setHeight('207px')
  } else {
    //usual PC screen, iPad
    setWidth('480px')
    setHeight('270px')
  }
}

export default detectWindowSize