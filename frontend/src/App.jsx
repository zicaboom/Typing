import { useEffect, useState } from "react"
import wordList from './resources/words.json'
import Word from './components/Word'

const MAX_TYPED_KEYS = 30

const getWord = () => {
    const index = Math.floor(Math.random() * wordList.length)
    return wordList[index].toLowerCase()
}

const isValidKey = (key, word) => {
    if(!word) return false
    const result = word.split('').includes(key)
    return result
}

const App = () => {

    const [typedKeys, setTypedKeys] = useState([])
    const [validKeys, setValidKeys] = useState([])
    const [completedWords, setCompletedWords] = useState([])
    const [word, setWord] = useState('')

    useEffect(()=>{
        setWord(getWord())
    }, [])

    useEffect(() => {
        const validKeysWord = validKeys.join('')

        if(validKeysWord.length === word.length){
            setValidKeys([])
            setCompletedWords([...completedWords, word])
            let newWord = null

            do{
                newWord = getWord()
            }while(completedWords.includes[newWord])
            
            setWord(newWord)
        }
    }, [validKeys])

    const handleKeyDown = (e) =>{
        e.preventDefault()
        const {key} = e

        if(isValidKey(key, word)){
            setValidKeys((prev)=>{
                const isValidLength = prev.length <= word.length
                const isNextChar = isValidLength && word[prev.length] === key
                return (isNextChar) ? [...prev, key] : prev
            })
        }

        setTypedKeys([...typedKeys, key].slice(MAX_TYPED_KEYS * -1))
    }

    return (
        <>
            <div className="container" tabIndex="0" onKeyDown={handleKeyDown}>

                <div className="valid-keys">
                    <Word word={word} validKeys={validKeys}/>
                </div>
                
                <div className="typed-keys">{typedKeys ? typedKeys.join(' ') : null}</div>

                <div className="completed-words">
                    <ol>
                        {completedWords.length === 0 
                        ? null    
                        : completedWords.map((word)=>( <li key={word}>{word}</li>))}
                    </ol>
                </div>

            </div>
        </>
    );
}

export default App;