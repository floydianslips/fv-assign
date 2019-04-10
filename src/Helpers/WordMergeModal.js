import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class WordMergeModal extends Component {
  render() {
    return (
      <>
        <Modal id={ this.props.id } show={ this.props.show } >
          <Modal.Header >
            <Modal.Title>Please select which option you would like to use for { this.props.objectKey }. If you want to save both click merge.</Modal.Title>
          </Modal.Header>
          <br />
          <Modal.Body>
            {this.props.firstChoice} <Button id='firstChoice' variant="primary" onClick={ this.props.firstChoiceClick }>
              Use This Data
            </Button>
            <br />
            {this.props.secondChoice} <Button id='secondChoice' variant="primary" onClick={ this.props.secondChoiceClick }>
              Use This Data
            </Button>

          </Modal.Body>
          <Modal.Footer>
            <Button id='closeButton' variant="secondary" onClick={ this.props.handleClose }>
              Cancel
            </Button>
            <Button id='mergeButton' variant="primary" onClick={ this.props.mergeChoice }>
              Merge Data
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
