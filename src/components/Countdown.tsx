import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Countdown.module.css";

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // padStart = verifica se a string tem 2 caracteres, se não tiver, coloca o zero na frente
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    // clearTimeout = Faz com que o countdown não execute por conta do delay de 1seg. Para na hora o contador.
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

  // [] Array de dependencias do use effect = toda vez que a variável isActive ou time mudar, ele executará uma função
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
          <>
            { isActive ? (

              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}>
                Abandonar ciclo
              </button>

            ) : (

                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}>
                  Iniciar um ciclo
                </button>

              )}
          </>
        )
      }
    </div>
  );
}