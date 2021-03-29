import subtitleService from '../services/subtitles'

const fetchData = (
  fetchReady,
  pathname,
  setEntries,
  setSubtitles,
  setWordlist,
  setAppReady,
  //setAbout,
  setPage
) => {

  subtitleService
    .getCollection('wordlist')
    .then(collection => {
      //console.log(collection)
      setWordlist(collection)
    })

  subtitleService
    .getCollection('words')
    .then(collection => {
      //console.log(collection)
      setEntries(collection)
    })

  if(fetchReady){
    if(pathname === '/'){
      //setPage('/')
      subtitleService
        .getAll()
        .then(collections => {
          //setEntries(collections.words)
          setSubtitles(collections.subtitles)
          //setWordlist(collections.wordlist)
          setAppReady(true)
        })
    } else if(pathname === '/about' ){
      //setPage('about')
      subtitleService
        .getAbout()
        .then(collections => {
          setEntries(collections.words)
          setSubtitles(collections.subtitles)
          setWordlist(collections.wordlist)
          setAppReady(true)
        })
    } else if(pathname === '/policy'){
      subtitleService
        .getAll()
        .then(collections => {
          setEntries(collections.words)
          setSubtitles(collections.subtitles)
          setWordlist(collections.wordlist)
          setAppReady(true)
        })
    }
  } else {
    console.log('waiting for the first query...')
    if(pathname === '/'){
      //setAbout(false)
      setPage('')
    } else if(pathname === '/about' ){
      //setAbout(true)
      setPage('about')
    } else if(pathname === '/privacypolicy'){
      setPage('privacypolicy')
    }
  }

}

export default fetchData