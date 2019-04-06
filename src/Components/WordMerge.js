import React, { Component } from 'react';
import axios from 'axios';

export default class  WordMerge extends Component {
  constructor() {
    super();
    this.state ={
      wordsUrl: "https://pznmh01oo9.execute-api.ca-central-1.amazonaws.com/dev/test-merge-two-records",
      wordToMerge: "",
      wordsThatAreTheSame: []
    }
  }

  handleInputChange = ({ target }) => {
    console.log("target", target.value)
    this.setState({word: target.value})
  }

  mergeSameWord = () => {
    const sameWords = this.state.wordsThatAreTheSame;
    const newWordEntry = [];
    const oldWordEntry = []
    const word1 = sameWords[0];
    const word2 = sameWords[1];
    for (let key in word1) {
      if (word1[key] !== word2[key]) {
        newWordEntry.push(word1[key], word2[key])
      console.log("word1", word1[key])
      console.log("word2", word2[key])
      // newWordEntry.push(element)
      }
      if (word1[key] === word2[key]) {
        oldWordEntry.push(word1[key])
        console.log("olderword", oldWordEntry)
      }
    }
  }


  getWordsToMerge = () => {
    return axios.get(this.state.wordsUrl)
    .then((response) => {
      let data = response.data;
      let sameWord = this.state.wordsThatAreTheSame;
      // console.log("response", response.data)
      data.forEach(element => {
        if (element.word === this.state.word) {
          sameWord.push(element)
          console.log(sameWord)
        }
      })
      this.setState({ wordsThatAreTheSame: sameWord });
    })
    .then(() => {
      // console.log("this", this.state.wordsThatAreTheSame)
      if (!this.state.wordsThatAreTheSame.length > 0) {
        alert("The word you entered was not found")
      } else { this.mergeSameWord() }
    })
    .catch((error) => {
      console.log('Error in getWordsToMerge in WordMerge.js: ', error);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getWordsToMerge();
    console.log(e)
  }

    handleEnter = (e) => {
    if(e.key === 'Enter'){
      this.handleSubmit()
    }
  }

render() {
  return (

    <form onSubmit={ this.handleSubmit }>
      <label>
        Word:
        <input id="wordInput" type="text" name="name" onChange={ this.handleInputChange } />
      </label>
        <input type="submit" value="Submit" onClick={ this.handleSubmit } />
    </form>
  )
}
}
