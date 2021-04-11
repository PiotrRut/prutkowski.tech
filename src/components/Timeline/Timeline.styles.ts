/* eslint-disable indent */
import { sizes } from '@theme/tokens';
import styled, { css, keyframes } from 'styled-components';

const lineGrowHorizontal = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 90%;
  }
`;

const lineGrowVertical = keyframes`
  0% {
    max-height: 0px;
  }
  100% {
    max-height: ${sizes['180']};
  }
`;

export const TimelineRoot = styled.div`
  padding: 0 0 ${sizes['30']};
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    overflow: scroll;
  }
`;

export const TimelineItem = styled.div<{ inView: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;

  &:before {
    width: ${sizes['1']};
    background-color: grey;
    content: '';
    margin: 0 ${sizes['10']} ${sizes['20']} 0;
    ${({ inView }) =>
      inView &&
      css`
        animation: ${lineGrowVertical} 1s ease;
        max-height: ${sizes['180']};
      `};
  }

  @media (min-width: 1024px) {
    flex-direction: column;
    &:before {
      height: ${sizes['1']};
      margin: 0 ${sizes['5']} ${sizes['10']} 0;
      ${({ inView }) =>
        inView &&
        css`
          animation: ${lineGrowHorizontal} 1s ease;
          width: 90%;
        `};
    }
  }
`;

export const TimelineCard = styled.div`
  border-radius: ${sizes['10']};
  margin: 0 ${sizes['10']} ${sizes['10']};
  padding: ${sizes['5']};
  max-height: ${sizes['300']};
  color: #fff;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  flex: 1 1 0px;
  width: 60vw;

  @media (min-width: 1024px) {
    width: ${sizes['300']};
    margin: ${sizes['5']} ${sizes['5']} ${sizes['5']} 0;
    min-height: ${sizes['150']};
  }
`;

export const Title = styled.p`
  font-size: ${sizes['18']};
`;

export const Details = styled.p`
  font-size: ${sizes['14']};
  color: grey;
`;

export const DateMark = styled.span`
  color: grey;
  width: ${sizes['50']};

  @media (min-width: 1024px) {
    width: ${sizes['100']};
  }
`;
