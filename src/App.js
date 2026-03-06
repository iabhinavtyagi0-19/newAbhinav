import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timesUp, setTimesUp] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [timer, setTimer] = useState(0);
  const [sen, setSen] = useState("");
  const [res, setRes] = useState("");

  const sentences = [
    "Success in any field requires consistent effort, deep focus, and the discipline to work even when motivation fades away. Those who commit to steady improvement, embrace challenges, and refuse distractions often discover growth beyond their expectations and limits.",

    "Technology continues to reshape the modern world at a rapid pace, demanding that individuals remain adaptable, curious, and proactive learners. Developing strong fundamentals in problem solving, communication, and logical thinking creates a powerful foundation for long term professional success.",

    "Building meaningful skills takes patience, repetition, and the willingness to make mistakes without losing confidence. Every challenge faced and every problem solved strengthens resilience, sharpens awareness, and expands the ability to think critically under pressure.",

    "A focused mind combined with clear goals creates extraordinary momentum in both personal and professional life. When daily habits align with long term vision, progress becomes measurable, motivation increases naturally, and self belief grows stronger through consistent achievement.",

    "Discipline is often more powerful than raw talent because structured effort compounds over time. Individuals who respect their schedule, protect their time, and maintain deliberate practice eventually outperform those who rely solely on inspiration or short bursts of energy.",
  ];

  // Generate random sentence on mount
  useEffect(() => {
    const ranIndex = Math.floor(Math.random() * sentences.length);
    setSen(sentences[ranIndex]);
  }, []);

  // Timer (10 seconds fixed)
  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev + 1 >= 60) {
          clearInterval(id);
          setTimesUp(true);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [timer]);

  // Typing comparison logic
  useEffect(() => {
    const senArr = sen.trim().split(" ");
    const inpArr = text.trim().split(" ");

    let correctCount = 0;
    let wrongCount = 0;

    for (let i = 0; i < inpArr.length; i++) {
      if (senArr[i] === inpArr[i]) {
        correctCount++;
      } else {
        wrongCount++;
      }
    }

    setCorrect(correctCount);
    setWrong(wrongCount);
  }, [text, sen]);

  function handleChange(e) {
    setText(e.target.value);
  }

  function calculateResult() {
    const totalTyped = correct + wrong;

    if (totalTyped > 0) {
      setAccuracy((correct / totalTyped) * 100);
    }

    if (timer > 0) {
      const wordsTyped = text.trim().split(" ").length;
      setSpeed((wordsTyped / timer) * 60);
    }
  }

  function restart() {
    const ranIndex = Math.floor(Math.random() * sentences.length);
    setSen(sentences[ranIndex]);
    setText("");
    setAccuracy(0);
    setSpeed(0);
    setTimesUp(false);
    setCorrect(0);
    setWrong(0);
    setTimer(0);
  }

  return (
    <div className="App">
      <div
        className="timer"
        style={{ color: timer >= 56 ? "red" : "lightgreen" }}
      >
        {timer} Seconds
      </div>{" "}
      <h1>Typing Speed Test</h1>
      <br />
      <p>{sen}</p>
      <br />
      <textarea
        placeholder="Start typing here..."
        onChange={handleChange}
        value={text}
        rows={4}
        cols={50}
        disabled={timesUp}
      />
      <br />
      <br />
      <button className="restart" onClick={restart}>
        Restart
      </button>
      <button className="result" onClick={calculateResult} disabled={!timesUp}>
        Result
      </button>
      <br />
      <br />
      <p>Correct: {correct}</p> <p> Wrong : {text.length > 1 ? wrong : "0"}</p>
      <p className="acc" style={{ color: accuracy > 50 ? "green" : "red" }}>
        {" "}
        Accuracy: {accuracy.toFixed(2)} %
      </p>
      <p className="speed">Speed: {speed.toFixed(2)} Words / Minute</p>
    </div>
  );
}
