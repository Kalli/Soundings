import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group';
import styles from './overlay.css'

export function overlay(){
	const body = document.getElementsByTagName('body')[0];
	const parent = document.createElement("div")
	body.appendChild(parent)
	ReactDOM.render(<PopOver />, parent);
}


class PopOver extends Component {

	constructor(props) {
		super(props)
		this.videoRef = React.createRef()
		this.state = {
			closed: false, timer: -1
		}
		this.script = [
            [140, 240],
            [240, 255],
            [300, 339],
            [339, 394],
            [394, 405],
            [449, 464],
		].sort(() => Math.random() - 0.5)
		this.scriptDone = 464
		this.quotes = [
			"Why do you feel comfortable saying this to me?",
			"Your own disgust at what you smell, what you feel, doesn't bring you to your feet, not right away, because gathering energy has become its own task, needing its own argument.",
			"You want to walk out and stand among them. And as light as the rain seems, it still rains down on you.",
			"You feel your own body wince.",
			"be no one but you first -- ",
			"You don't know.\n You don't know what she means. ",
			"What did you say?\n You are reminded of a conversation you had recenly.",
			"You need your glasses to single out what you know is there because doubt is inexorable; you put on your glasses.\n You smell good.",
			"You nothing\n You nobody.\n You.",
			"How difficult is it for one body to feel the injustice wheeled at another? Are the tensions, the recognitions, the disappointments, and the failures that exploded in the riots too foreign?",
			"Where can I imagine you have been?"
		]
	}

	escFunction = (event) => {
		if(event.keyCode === 27) {
			this.close(event)
		}
	}

	componentDidMount(){
		document.addEventListener("keydown", this.escFunction, false);
	}

	componentWillUnmount(){
		document.removeEventListener("keydown", this.escFunction, false);
	}

	close = (e) => {
		e.preventDefault()
		if (this.videoRef.current){
			this.videoRef.current.pause()
		}
		this.setState({closed: true, timer: -1, video: false})
	}

	quote() {
		if (this.state.closed){
			return ""
		}

		if (this.state.timer < this.scriptDone + 5){
			setTimeout( () => {
	            this.setState({
		            timer: Math.floor(this.videoRef.current.currentTime)
	            });
	        }, 1000)
		}

		const index = this.script.findIndex((e) => {
			return e[0] <= this.state.timer && this.state.timer < e[1]
		})

		if (index !== -1 && index < this.script.length){
			const timeRemaining= this.script[index][1] - this.state.timer

			const fadeout = timeRemaining < 5? styles.quoteFadeout : ""
			const position = index % 2 === 0 ? styles.quoteTop :
				styles.quoteBottom

			const content = this.quotes[index].split('\n').map((e, i) => {
				return <span key={i}>{e}<br /></span>
			})
			return <blockquote className={position + " " + fadeout} >
				{content}
			</blockquote>
		}
		return ""
	}

	render (){
		const videoPath = "https://karltryggvason.com/their-fiska-sem-roa/video"

		return <CSSTransition
			in={!this.state.closed}
			appear={true}
			timeout={200}
			classNames={"overlay"}
			onEntered={(e) => this.quote()}
		>
			<div className={styles.overlay} >
				<div className={styles.modal}>
					<video
						className={styles.video}
						ref={this.videoRef}
						width={"100%"}
						height={"100%"}
						autoPlay
						playsinline
					>
						<source src={videoPath+".mp4"} type="video/mp4" />
						Unfortunately your browser does not support video.
					</video>
					{this.quote()}
					<a className={styles.close} onClick={this.close} />
				</div>
			</div>
        </CSSTransition>
	}
}