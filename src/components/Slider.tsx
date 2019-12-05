import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const SliderRail = styled.div`
  width: 240px;
  height: 4px;
  border-radius: 2px;
  background: #eeeeee;
  position: relative;
`;

const Prev = styled.div`
  background: rgb(242, 112, 156);
  border-radius: 2px;
  height: 4px;
  width: 40%;
`;

const SliderHander = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgb(242, 112, 156);
  background: white;
  cursor: pointer;
  position: absolute;
  top: -5px;
  left: -7px;
`;

type SliderProps = {
  max: number;
  min?: number;
  value: number;
  onChange: (value: number) => void;
};

const Slider = (props: SliderProps) => {
  const { max, min = 0, value, onChange } = props;
  const instance = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const offsetLeft = width * (value / max);

  if (value < min) onChange(min);

  useEffect(() => {
    const width = instance.current
      ? instance.current.getBoundingClientRect().width
      : 0;
    setWidth(width);
  }, [instance]);

  const handleMouseDown = (event: React.MouseEvent) => {
    const startX = event.clientX;
    const offsetMax = width - offsetLeft;
    const offsetMin = -offsetLeft + (min / max) * width;

    const mouseMove = (event: MouseEvent) => {
      let offset = event.clientX - startX;
      offset = Math.min(offset, offsetMax);
      offset = Math.max(offset, offsetMin);
      onChange(Math.floor(((offsetLeft + offset) / width) * max));
    };

    const mouseUp = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  };

  return (
    <SliderRail ref={instance}>
      <Prev style={{ width: `${offsetLeft}px` }} />
      <SliderHander
        style={{ transform: `translateX(${offsetLeft}px)` }}
        onMouseDown={event => handleMouseDown(event)}
      />
    </SliderRail>
  );
};

export default Slider;
