import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Progress = styled.div`
  display: flex;
  justify-content: center;
`;

const Bar = styled.div`
  width: 280px;
  height: 18px;
  background: #eee;
  display: flex;
`;

const BarInner = styled.div`
  background: linear-gradient(to left, rgb(242, 112, 156), rgb(255, 148, 114));
  box-shadow: 0 3px 3px -5px rgb(242, 112, 156), 0 2px 5px rgb(242, 112, 156);
  border-radius: 5px;
  width: 100px;
  height: 100%;
`;

const ProgressText = styled.span`
  margin-left: 12px;
  color: #999999;
  width: 24px;
  text-align: right;
`;

type ProgressBarProps = {
  percent: number;
  format?: (percent: number) => string;
  showProgressText?: boolean;
};

const ProgressBar: FunctionComponent<ProgressBarProps> = props => {
  const { percent, format, showProgressText } = props;
  const innerWidth = { width: `${percent}%` };

  return (
    <Progress>
      <Bar>
        <BarInner style={innerWidth} />
      </Bar>
      {showProgressText && (
        <ProgressText>{format ? format(percent) : `${percent}%`}</ProgressText>
      )}
    </Progress>
  );
};

ProgressBar.defaultProps = {
  showProgressText: true
};

export default ProgressBar;
