import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';

const ALLLJOKESBYKEYWORD = 'https://api.chucknorris.io/jokes/search?query=' 

const Logo = ({ loading }) => {
  return (
    <img
      src={logo}
      alt='interactive-logo'
      className={`App-logo${loading ? '-spinning' : ''}`} 
    />
  )
}

const Joke = ({ value, categories }) => {
  return (
    <div className="Joke">
      <code className="Joke-Value">{value}</code>
       {Array.isArray(categories) && categories.map((category, index) =>
        <span className="Selected-Cat" key={index}>
          <code>{category}</code>
        </span>
      )}
    </div>
  )
}

  function App() {
    const [inputText, setInputText] = useState('')
    const [loading, setLoading] = useState(false)
    const [fetchedJoke, setFetchedJoke] = useState({})

  const getJokeByKeyword = async () => {
    let firstJoke = {}
    try {
      setLoading(true)
      let response = await fetch(`${ALLLJOKESBYKEYWORD}${inputText}`)
      let data = await response.json()
      firstJoke = {...data.result[0]}
    } catch (err) {
    } finally {
      setLoading(false)
      setFetchedJoke(firstJoke)
    }
  }

  const onInputTextChange = (e) => {
    setInputText(e.target.value)
  }

    return (
      <div className="App">
        <div className="App-header">
          <Logo
            loading={loading}
          />
          <input
            type="search"
            id="search" name="search"
            placeholder="Enter keyword here"
            value={inputText}
            onChange={onInputTextChange}
          />
          <button
            className="Search-Button"
            onClick={getJokeByKeyword}
          >
            <code>CLICK TO SEARCH!</code>
          </button>
        </div>
        <div className="Content">
          <img
            src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png" 
            className="Chuck-Logo"
            alt="chuck-logo"
          />
          {Object.keys(fetchedJoke).length > 0 && <Joke 
          value ={fetchedJoke.value}
          categories ={fetchedJoke.categories}
          />}
        </div>
        <div className="footer">
        <code>Esame di React per cfp-futura. Grazie ad <a href="https://api.chucknorris.io">api.chucknorris.io</a> per l'immagine e le api. Docente: Vito Vitale. Studente: Miriana Caliendi </code>
        </div>
      </div>
    );
  // }
};

export default App;
