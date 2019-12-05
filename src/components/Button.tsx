import React, { FunctionComponent } from "react";
import styled from "styled-components";

const ButtonTag = styled.button`
  padding: 6px 24px;
  background: linear-gradient(to left, rgb(242, 112, 156), rgb(255, 148, 114));
  border-radius: 40px;
  color: white;
  border: none;
  font-size: 16px;
  outline: none;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.76;
  }

  &:active {
    opacity: 1;
  }
`;

const ButtonPlain = styled(ButtonTag)`
  background: #ccc;
`;

type ButtonProps = {
  plain?: boolean;
  onClick?: () => void;
};

const Button: FunctionComponent<ButtonProps> = props => {
  const { children, plain, onClick } = props;
  const Tag = plain ? ButtonPlain : ButtonTag;

  return <Tag onClick={() => onClick && onClick()}>{children}</Tag>;
};

export default Button;
