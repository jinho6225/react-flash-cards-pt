import React from 'react';
import RemoveModal from './remove-modal';

class ViewCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: {
        show: false,
        displayNone: true,
      },
      answer: null,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.timeId = null;
    this.timeAnswerId = null;
  }

  showAnswer(id) {
    const { answer } = this.state;
    this.setState({
      answer: id,
    });
    this.timeAnswerId = setTimeout(() => {
      this.setState({
        answer: null,
      });
    }, 1500);
  }

  toggleModal() {
    const {
      showModal: { show },
    } = this.state;
    if (show) {
      this.setState({
        showModal: {
          show: false,
          displayNone: false,
        },
      });
      this.timeId = setTimeout(() => {
        this.setState({
          showModal: {
            show: false,
            displayNone: true,
          },
        });
      }, 750);
    } else {
      this.setState({
        showModal: {
          show: true,
          displayNone: false,
        },
      });
      clearTimeout(this.timeId);
    }
  }

  render() {
    const {
      cards,
      setView,
      deleteCard,
      isEditing,
      setActiveCard,
      activeCard,
    } = this.props;
    if (cards.length === 0) {
      return (
        <div>
          <h1 className="text-center m-4 p-2">My Cards</h1>
          <h4 className="text-center">Card deck is empty...</h4>
          <h4 className="text-center">
            <span
              className="badge badge-primary p-2"
              onClick={() => {
                setView('create-card');
              }}
            >
              Create Card
            </span>
          </h4>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="text-center m-4 p-2">My Cards</h2>
          <div className="row row-cols-1 row-cols-md-3">
            {cards.map((card, i) => {
              return (
                <div className="col mb-3" key={i}>
                  <div className="card">
                    <div className="card-body bg-dark">
                      <h6 className="card-title text-secondary">Question</h6>
                      <p className="card-text text-white">{card.question}</p>
                    </div>
                    <div className="card-body bg-secondary">
                      <h6
                        className="icon"
                        id={i}
                        onClick={(e) => {
                          this.showAnswer(e.target.id);
                        }}
                      >
                        Check the answer
                      </h6>
                      <p className="card-text text-white">
                        {this.state.answer === i.toString() ? card.answer : ''}
                      </p>
                      <div className="bg-secondary d-flex justify-content-center">
                        <i
                          className="far fa-edit icon"
                          onClick={() => {
                            setView('create-card');
                            this.props.editing(i + 1);
                          }}
                        ></i>
                        <span>&#160;&#160;&#160;&#160;</span>
                        <i
                          className="far fa-trash-alt icon"
                          onClick={() => {
                            setActiveCard(i);
                            this.toggleModal();
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <RemoveModal
            activeCard={activeCard}
            deleteCard={deleteCard}
            showModal={this.state.showModal}
            toggleModal={this.toggleModal}
          />
        </div>
      );
    }
  }
}

export default ViewCards;
