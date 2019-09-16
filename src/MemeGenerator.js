import React, {Component} from 'react';

class MemeGenerator extends Component {
  constructor () {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      randomImg: 'http://www.dumpaday.com/wp-content/uploads/2018/06/photos-1.jpg',
      allMemeImg: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch ('https://api.imgflip.com/get_memes')
      .then(response => response.json())
      .then(response => {
        const {memes}= response.data;
        this.setState({allMemeImg: memes})
      });
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState ({[name] : value})
  }

  handleSubmit(event) {
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImg.length);
    const randMeme = this.state.allMemeImg[randNum].url;
    this.setState({randomImg : randMeme})
  }
  
  render () {
    return (
      <div>
        <form className='meme-form flex-enable' onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='topText'
            placeholder='Top Text'
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='bottomText'
            placeholder='Bottom Text'
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>
        <div className='meme'>
          <img src={this.state.randomImg} alt='meme' />
          <h2 className='top'>{this.state.topText}</h2>
          <h2 className='bottom'>{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;