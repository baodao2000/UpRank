import styled from 'styled-components'
const bgColor = '#cfcfcf'
const lineColor = '#a9a9a9'
const Planet = styled.div`
  display: block;
  width: 125px;
  height: 125px;
  position: relative;
  transform-style: preserve-3d;
  border-radius: 50%;
  background: ${bgColor};

  background: linear-gradient(
    180deg,
    ${bgColor} 0%,
    ${bgColor} 15%,
    ${lineColor} 15%,
    ${lineColor} 19%,
    ${bgColor} 19%,
    ${bgColor} 22%,
    ${lineColor} 22%,
    ${lineColor} 28%,
    ${bgColor} 28%,
    ${bgColor} 31%,
    ${bgColor} 33%,
    ${bgColor} 36%,
    ${lineColor} 36%,
    ${lineColor} 48%,
    ${bgColor} 48%,
    ${bgColor} 55%,
    ${lineColor} 55%,
    ${lineColor} 66%,
    ${bgColor} 66%,
    ${bgColor} 70%,
    ${lineColor} 70%,
    ${lineColor} 73%,
    ${bgColor} 73%,
    ${bgColor} 82%,
    ${lineColor} 82%,
    ${lineColor} 86%,
    ${bgColor} 86%
  );
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.3), inset 8px -4px 6px rgba(61, 61, 61, 0.3),
    inset -8px 4px 8px rgba(140, 140, 140, 1), inset 20px -5px 12px ${lineColor}, 0 0 100px #717575;
  transform: rotateZ(-15deg);

  ::before {
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 16px solid #b1b1b1;
    border-top-width: 0;
    border-radius: 50%;
    box-shadow: 0 -2px 0 #cacaca;
    animation: rings1 0.8s infinite linear;
  }

  ::after {
    position: absolute;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 8px solid #949494;
    border-top-width: 0;
    border-radius: 50%;
    box-shadow: 0 -2px 0 #949494;
    animation: rings2 0.8s infinite linear;
  }

  @keyframes rings1 {
    0% {
      transform: rotateX(65deg) rotateZ(0deg) scale(1.75);
    }

    100% {
      transform: rotateX(65deg) rotateZ(360deg) scale(1.75);
    }
  }

  @keyframes rings2 {
    0% {
      transform: rotateX(65deg) rotateZ(0deg) scale(1.7);
    }

    100% {
      transform: rotateX(65deg) rotateZ(360deg) scale(1.7);
    }
  }
`
export const TrendyPlanetSpinner = () => {
  return <Planet />
}
