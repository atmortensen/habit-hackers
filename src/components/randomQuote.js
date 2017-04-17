import React, {Component} from 'react'
import quotes from '../helpers/quotes'
import '../css/randomQuote.css'

export default class RandomQuote extends Component {
	constructor(){
		super()

		this.state = {
			quote: ''
		}
	}

	componentDidMount(){
		function getRandomInt(min, max) {
		  min = Math.ceil(min)
		  max = Math.floor(max)
		  return Math.floor(Math.random() * (max - min)) + min
		}
		this.setState({quote: quotes[getRandomInt(0, quotes.length-1)]})
	}

  render() {
    return (
      <div className={this.props.className + ' quote'}>
        <p className="quoteText">"{this.state.quote.quote}"</p>
        <p className="author">- {this.state.quote.author}</p>
      </div>
    )
  }
}
