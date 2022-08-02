import React, { useEffect, useState } from "react";

function App() {

	const DEFAULT_TIMER_VAL = 1555

	const [timeRemaining, setTimeRemaining] = useState(DEFAULT_TIMER_VAL);
    const [isTimeRunning, setIsTimeRunning] = useState(false);
    const [mode, setMode] = useState("inactive");
    const [backgroundColor, setBackgroundColor] = useState("bg-yellow-500");

    useEffect(() => {
        if (isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining((time) => time - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setTimeRemaining(DEFAULT_TIMER_VAL);
            updateMode();
        }
    }, [timeRemaining, isTimeRunning]);

    function updateMode() {
        switch (mode) {
            case "inactive":
                setMode("active");
                setBackgroundColor("bg-red-500");
                break;
            case "active":
                setMode("break");
                setBackgroundColor("bg-green-500");
                break;
            case "break":
                setMode("inactive");
                setBackgroundColor("bg-yellow-500");
                break;
        }
    }

	function getTimeString() {
        const minutes = Math.floor(timeRemaining / 60)
        const seconds = timeRemaining - Math.floor(timeRemaining / 60) * 60

		let timeString = ""
		if (minutes < 10) {
			timeString += '0'
		}
		timeString += `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`

		return timeString;
    }

    return (
        <div
            className={`w-96 h-72 rounded-lg ${backgroundColor} border-4 border-white border-solid`}
        >
            <div className="w-full h-full flex flex-col justify-around items-center font-cabin">
                <h1 className="text-5xl font-bold text-white">{mode}</h1>
                <h1 className="text-8xl font-bold text-white">
                    {getTimeString()}
                </h1>
                <div className="flex gap-4">
                    <button
                        className="bg-white w-16 rounded-lg text-lg"
                        onClick={() => setIsTimeRunning((prev) => !prev)}
                    >
                        {isTimeRunning ? "Pause" : "Start"}
                    </button>
                    <button
                        onClick={() => {
                            setTimeRemaining(DEFAULT_TIMER_VAL);
                        }}
                    >
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
