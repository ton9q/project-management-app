import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export function GooSpinner({ size = 55, color = '#fff', sizeUnit = 'px' }) {
  const countBalls = 2;
  return (
    <Wrapper size={size} sizeUnit={sizeUnit}>
      <BallsWrapper size={size} sizeUnit={sizeUnit}>
        {getBalls({ countBalls, color, size, sizeUnit })}
      </BallsWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </Wrapper>
  );
}

function getBalls({
  countBalls,
  color,
  size,
  sizeUnit,
}: {
  countBalls: number;
  color: string;
  size: number;
  sizeUnit: string;
}) {
  const balls = [];
  const center = size / 4;
  const ballsTranslatePositions = [-center, center];
  for (let i = 0; i < countBalls; i++) {
    balls.push(
      <Ball
        color={color}
        size={size}
        x={size / 2 - size / 6}
        y={size / 2 - size / 6}
        key={i.toString()}
        translateTo={ballsTranslatePositions[i]}
        sizeUnit={sizeUnit}
      />
    );
  }
  return balls;
}

function rotate() {
  return keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
}

function move({ translateTo, sizeUnit }: { translateTo: number; sizeUnit: string }) {
  return keyframes`
    0%{
        transform: translateY(0) scale(1);
    }
    50%{
        transform: translateY(${translateTo}${sizeUnit}) scale(0.8);
    }
    100%{
        transform: translateY(0) scale(1);
    }
`;
}

const shouldForwardProp = (prop: string) =>
  !['size', 'x', 'y', 'color', 'translateTo', 'sizeUnit'].includes(prop);

const Wrapper = styled('div', {
  shouldForwardProp: shouldForwardProp,
})<{ size: number; sizeUnit: string }>((props) => ({
  width: `${props.size}${props.sizeUnit}`,
  height: `${props.size}${props.sizeUnit}`,
  filter: 'url("#goo")',
}));

const BallsWrapper = styled('div', {
  shouldForwardProp: shouldForwardProp,
})<{ size: number; sizeUnit: string }>((props) => ({
  position: 'relative',
  width: `${props.size}${props.sizeUnit}`,
  height: `${props.size}${props.sizeUnit}`,
  animation: `${rotate()} 1.7s linear infinite`,
}));

const Ball = styled('div', {
  shouldForwardProp: shouldForwardProp,
})<{ size: number; sizeUnit: string; x: number; y: number; color: string; translateTo: number }>(
  (props) => ({
    position: 'absolute',
    top: `${props.y}${props.sizeUnit}`,
    left: `${props.x}${props.sizeUnit}`,
    width: `${props.size / 3}${props.sizeUnit}`,
    height: `${props.size / 3}${props.sizeUnit}`,
    borderRadius: '50%',
    backgroundColor: props.color,
    animation: `${move({
      translateTo: props.translateTo,
      sizeUnit: props.sizeUnit,
    })} 1.5s ease-in-out infinite`,
  })
);
