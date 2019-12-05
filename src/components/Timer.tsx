import React, { useState } from "react";
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import Slider from "./Slider";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 80px;
`;

const TitmerTitle = styled.div`
  font-size: 40px;
  font-weight: lighter;
  letter-spacing: 4px;
  margin-bottom: 32px;
  color: #aaa;

  &.complete {
    background: linear-gradient(
      to left,
      rgb(242, 112, 156),
      rgb(255, 148, 114)
    );
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const Main = styled.main`
  margin-bottom: 48px;
  display: flex;
  justify-items: center;
  align-items: center;
`;

const ElapsedLabel = styled.label`
  margin-right: 20px;
`;

const DurationTime = styled.div`
  margin-left: 32px;
  width: 24px;
  text-align: right;
`;

const Duration = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DurationLabel = styled.label`
  margin-right: 12px;
`;

const Overview = styled.div`
  margin-bottom: 20px;
  color: #aaa;
`;

const ButtonGroup = styled.div`
  display: flex;
  button + button {
    margin-left: 20px;
  }
`;

let time: number = 0;
const clearTime = () => {
  clearInterval(time);
  time = 0;
};

const Timer = () => {
  const [duration, setDuration] = useState(5);
  const [elapsed, setElapsed] = useState(0);

  const start = () => {
    if (time) return;
    if (elapsed === duration) {
      setElapsed(0);
    }
    time = setInterval(() => {
      setElapsed(pre => {
        const result = Math.round((pre + 0.1) * 10) / 10;
        if (result < duration) return result;
        clearTime();
        return duration;
      });
    }, 100);
  };

  const reset = () => {
    setElapsed(0);
    start();
  };

  const pause = () => {
    clearTime();
  };

  const durationChange = (value: number) => {
    clearTime();
    setElapsed(0);
    setDuration(value);
  };

  return (
    <Container>
      <TitmerTitle className={duration === elapsed ? "complete" : ""}>
        Timer
      </TitmerTitle>
      <Main>
        <ElapsedLabel>elapsed Time:</ElapsedLabel>
        <ProgressBar percent={Math.round((elapsed / duration) * 100)} />
      </Main>
      <Overview>
        {elapsed}/{duration}
      </Overview>
      <Duration>
        <DurationLabel>Duration:</DurationLabel>
        <Slider
          max={60}
          min={1}
          value={duration}
          onChange={value => durationChange(value)}
        />
        <DurationTime>{duration}</DurationTime>
      </Duration>
      <ButtonGroup>
        <Button onClick={() => start()}>Start</Button>
        <Button plain onClick={() => reset()}>
          Reset
        </Button>
        <Button plain onClick={() => pause()}>
          Pause
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Timer;
