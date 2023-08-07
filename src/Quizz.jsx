import React from "react"


export default function Quizz() {

    const [questions, setQuestions] = React.useState('');

    React.useEffect( () => {
        console.log('useEffect Ran')
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then( (res) => res.json() )
            .then( (data) => setQuestions(data))
    },[])

    console.log(questions.results[0].question)

    return(
        <main>
            <h2>Quizz Placeholder</h2>
        </main>
    )
}