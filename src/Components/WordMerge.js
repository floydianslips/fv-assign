import React, { Component } from 'react';
import axios from 'axios';
import WordMergeModal from '../Helpers/WordMergeModal'

export default class  WordMerge extends Component {
  constructor() {
    super();
    this.state = {
      wordsUrl: "https://pznmh01oo9.execute-api.ca-central-1.amazonaws.com/dev/test-merge-two-records",
      wordsThatAreTheSame: new Map(),
      elementsThatAreTheSame: new Map(),
      elementsThatAreDifferent: new Map(),
      modalShow: false,
      optionOne: "",
      objectKey: "",
      firstChoice: "",
      secondChoice: "",
      word: ""
    }
  }

  // Get differences between two entries for user to select one entry or merge
  userMergeChoices = () => {
    const differentElements = this.state.elementsThatAreDifferent;
    if (differentElements.size > 0) {
      for (let [key, value] of differentElements) {
      this.setState({ objectKey: key, firstChoice: JSON.stringify(value[0]), secondChoice: JSON.stringify(value[1]), modalShow: true })
      }
    } else {
      // Set the alert to view new word entry
      let newWordEntry = [];
      for (let [key, value] of this.state.elementsThatAreTheSame) {
        console.log("key", key, "value", value)
        newWordEntry.push(`${key}: ${JSON.stringify(value)}`)
      }
      this.cancelWordEntry()
      alert(newWordEntry.join("\n"));
    }
  }

  // Split entries into two maps, one with elements that are the same and one with elements that are different. Set state using these maps
  mergeSameWord = () => {
    const sameWords = this.state.wordsThatAreTheSame;
    const newWordEntry = new Map();
    const oldWordEntry = new Map();
    const word1 = sameWords.get(0);
    const word2 = sameWords.get(1);
    for (let key in word1) {
      if (word1[key] !== word2[key]) {
        newWordEntry.set([key], [word1[key], word2[key]])
      }
      if (word1[key] === word2[key]) {
        oldWordEntry.set([key], word1[key])
      }
    }
    this.setState({ elementsThatAreDifferent: newWordEntry, elementsThatAreTheSame: oldWordEntry })
    this.userMergeChoices()
  }

  // Get entries and pull out entries that are for the same words.
  getWordsToMerge = () => {
    let sameWord = new Map();
    return axios.get(this.state.wordsUrl)
    .then((response) => {
      let data = response.data;
      data.forEach((element, i) => {
        if (element.word === this.state.word) {
          sameWord.set(i, element)
        }
      })
      // Set the state using the duplicate entries
      this.setState({ wordsThatAreTheSame: sameWord });
    })
    .then(() => {
      // If word entered in form is not found alert user the word is not in the database.
      if (!sameWord.size > 0) {
        alert("The word you entered was not found")
      } else { this.mergeSameWord() }
    })
    .catch((error) => {
      console.log('Error in getWordsToMerge in WordMerge.js: ', error);
    });
  }

  // Open modal
  handleShow = () => {
    this.setState({ modalShow: true });
  }

  // Close modal
  handleClose = () => {
    this.setState({ modalShow: false });
  }

  // If user wants to select the first entry data this button saves that data. REFACTOR THE NEXT THREE FUNCTIONS
  handleFirstChoiceClick = () => {
    const addToWordElements = this.state.elementsThatAreTheSame
    const removeWordElement = this.state.elementsThatAreDifferent
    addToWordElements.set(this.state.objectKey, JSON.parse(this.state.firstChoice))
    removeWordElement.delete(this.state.objectKey)
    this.handleClose()
    this.setState({ elementsThatAreDifferent: removeWordElement, elementsThatAreTheSame: addToWordElements })
    this.userMergeChoices()
  }

  // Save second entry data
  handleSecondChoiceClick = () => {
    const addToWordElements = this.state.elementsThatAreTheSame
    const removeWordElement = this.state.elementsThatAreDifferent
    addToWordElements.set(this.state.objectKey, JSON.parse(this.state.secondChoice))
    removeWordElement.delete(this.state.objectKey)
    this.handleClose()
    this.setState({ elementsThatAreDifferent: removeWordElement, elementsThatAreTheSame: addToWordElements })
    this.userMergeChoices()
  }

  // Merge both data sets
  handleMergeClick = () => {
    const addToWordElements = this.state.elementsThatAreTheSame
    const removeWordElement = this.state.elementsThatAreDifferent
    addToWordElements.set(this.state.objectKey, [JSON.parse(this.state.secondChoice), JSON.parse(this.state.firstChoice)])
    removeWordElement.delete(this.state.objectKey)
    this.handleClose()
    this.setState({ elementsThatAreDifferent: removeWordElement, elementsThatAreTheSame: addToWordElements })
    this.userMergeChoices()
  }

  // Set word that is to be looked up on change in form field
  handleInputChange = ({ target }) => {
    this.setState({word: target.value})
  }

  // Handle form submit
  handleSubmit = (e) => {
    e.preventDefault();
    this.getWordsToMerge();
  }

  // When enter is pressed handle the submit
  handleEnter = (e) => {
    if(e.key === 'Enter'){
      this.handleSubmit()
    }
  }

  // Reset word search form after user finishes merging
  cancelWordEntry = () => {
    document.getElementById("wordSearch").reset();
  }

  render() {
    return (
      <>
        <WordMergeModal
          mergeChoice={ this.handleMergeClick }
          secondChoiceClick={ this.handleSecondChoiceClick }
          firstChoiceClick={ this.handleFirstChoiceClick }
          handleClose={ this.handleClose }
          objectKey={ this.state.objectKey }
          firstChoice={ this.state.firstChoice }
          secondChoice={ this.state.secondChoice }
          show={ this.state.modalShow }
        />
      <form id="wordSearch" onSubmit={ this.handleSubmit }>
        <label>
          Word:
          <input id="wordInput" type="text" name="name" onChange={ this.handleInputChange } />
        </label>
          <input type="submit" value="Submit" onClick={ this.handleSubmit } />
      </form>
    </>
    )
  }
}
