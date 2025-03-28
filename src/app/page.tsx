"use client"
import { useEffect, useState } from "react"

export default function MathGame() {
  const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1

  const [randomNumber1, setRandomNumber1] = useState(generateRandomNumber())
  const [randomNumber2, setRandomNumber2] = useState(generateRandomNumber())
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [problemCount, setProblemCount] = useState(0)
  const [showStartModal, setShowStartModal] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && problemCount < 10) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (gameStarted && (timeLeft <= 0 || problemCount >= 10)) {
      setGameOver(true)
    }
  }, [timeLeft, problemCount, gameStarted])

  const handleSubmit = () => {
    const correctAnswer = randomNumber1 + randomNumber2
    const isAnswerCorrect = Number.parseInt(userAnswer) === correctAnswer

    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      setUserAnswer("")
      setProblemCount(problemCount + 1)
      setIsCorrect(null)

      if (problemCount < 9) {
        setRandomNumber1(generateRandomNumber())
        setRandomNumber2(generateRandomNumber())
        setTimeLeft(30) // Reset timeLeft for the next problem
      }
    }, 500)
  }

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter" && userAnswer) {
      handleSubmit()
    }
  }

  const startGame = () => {
    setShowStartModal(false)
    setGameStarted(true)
  }

  const restartGame = () => {
    setRandomNumber1(generateRandomNumber())
    setRandomNumber2(generateRandomNumber())
    setUserAnswer("")
    setScore(0)
    setProblemCount(0)
    setTimeLeft(30)
    setGameOver(false)
    setIsCorrect(null)
    setGameStarted(true)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-sky-500 to-violet-500 p-2 overflow-hidden">
      {/* Start Game Modal */}
      {showStartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all animate-scaleIn">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                Math Challenge
              </h2>
              <div className="flex justify-center my-4">
                <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-md">
                    7
                  </div>
                  <span>+</span>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-md">
                    8
                  </div>
                  <span>=</span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shadow-md border-2 border-gray-300">
                    ?
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Test your addition skills! Solve 10 math problems as quickly as you can.
              </p>
              <ul className="text-left text-sm sm:text-base mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 10 random addition problems
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 30 seconds per problem
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> See your final score
                </li>
              </ul>
              <button
                onClick={startGame}
                className="w-full px-6 py-3 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-xl p-4 m-4">
        {/* Header */}
        <div className="text-center p-2 pb-2 border-b">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
            <span className="text-yellow-500">✨</span>
            Math Challenge
            <span className="text-yellow-500">✨</span>
          </h1>

          {!gameOver && gameStarted && (
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full flex gap-1 items-center">
                <span className="text-gray-500">⏱️</span> {timeLeft}s
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Problem {problemCount + 1}/10</span>
              <span className="text-xs px-2 py-1 bg-gray-100 rounded-full flex gap-1 items-center">
                <span className="text-yellow-500">🏆</span> Score: {score}
              </span>
            </div>
          )}

          {!gameOver && gameStarted && (
            <div className="w-full bg-gray-200 h-2 rounded-full mt-3">
              <div
                className={`h-full rounded-full ${timeLeft < 10 ? "bg-red-500" : "bg-blue-500"}`}
                style={{
                  width: `${(timeLeft / 30) * 100}%`,
                  transition: "width 1s linear",
                }}
              ></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-2 sm:p-4">
          {gameOver ? (
            <div className="text-center py-4 sm:py-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Game Over!</h2>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {score}/10
              </div>
              <p className="text-base sm:text-lg mb-4">
                {score === 10
                  ? "Perfect score! Amazing!"
                  : score >= 8
                    ? "Great job!"
                    : score >= 5
                      ? "Good effort!"
                      : "Keep practicing!"}
              </p>
            </div>
          ) : gameStarted ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-bold">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                  {randomNumber1}
                </div>
                <span className="text-xl">+</span>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                  {randomNumber2}
                </div>
                <span className="text-xl">=</span>
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-md border-2 ${
                    isCorrect === null
                      ? "border-gray-300"
                      : isCorrect
                        ? "border-green-500 bg-green-100"
                        : "border-red-500 bg-red-100"
                  }`}
                >
                  ?
                </div>
              </div>

              <div className="flex justify-center items-center flex-col w-full gap-2 mt-2">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full text-center text-lg p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your answer"
                  autoFocus
                />
                <button
                  onClick={handleSubmit}
                  disabled={!userAnswer}
                  className={`w-full sm:w-2/3 px-3 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-1 ${
                    !userAnswer ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 transition-colors"
                  }`}
                >
                  Submit <span>→</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <div className="animate-pulse text-center">
                <p className="text-gray-500">Loading game...</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-center p-2 pt-2">
          {gameOver && (
            <button
              onClick={restartGame}
              className="px-4 py-2 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Play Again
            </button>
          )}
        </div>
      </div>

      <div className="text-white text-xs text-center mt-2 mb-4 px-4">
        <p>Made with ❤️ by Masum Rana</p>
        <p>Inspired by Tamim Shahriar Subeen</p>
        <p>© {new Date().getFullYear()} Math Game</p>
      </div>
    </div>
  )
}

