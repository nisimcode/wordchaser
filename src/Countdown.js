import React, {useEffect, useRef, useState} from 'react'
import Form from "react-bootstrap/Form"


const Countdown = ({gameOver, handlePass, points, maxSecs, tries}) => {

	// We need ref in this, because we are dealing with JS setInterval to keep track of it and stop it when needed
	const Ref = useRef(null)

	// The state for our timer
	const [timer, setTimer] = useState(maxSecs);

	const getTimeRemaining = (e) => {
		const total = Date.parse(e) - Date.parse(Date())
		const seconds = Math.floor((total / 1000) % 60)
		return { total, seconds }
	}

	const startTimer = (e) => {
		let { total, seconds } = getTimeRemaining(e)
		if (total >= 0) {
			// update the timer, check if less than 10 then we need to add '0' at the beginning of the variable
			setTimer(seconds)
		}
		if (total === 0) {
			handlePass()
		}
	}

	const clearTimer = (e) => {
			// If you adjust it you should also need to adjust the end-time formula we are about to code next
			setTimer(maxSecs)

			// If you try to remove this line the updating of timer Variable will be after 1000ms or 1sec
			if (Ref.current) clearInterval(Ref.current);
			Ref.current = setInterval(() => {
				startTimer(e)
			}, 1000)
	}

	const getDeadTime = () => {
		let deadline = new Date()

		// This is where you need to adjust if you intend to add more time
		deadline.setSeconds(deadline.getSeconds() + maxSecs)
		return deadline;
	}

	const getValue = () => {
		if (gameOver) {
			return 0
		}
		return timer
	}

	// We can use useEffect so that when the component mount the timer will start as soon as possible
	// We put empty array to act as componentDidMount only
	useEffect(() => {
			clearTimer(getDeadTime())
	}, [points, tries])

	return (
		<Form.Control style={{height: 50, width: 80, textAlign: "center"}}
									value={getValue()} disabled={true}/>
		)
}

export default Countdown