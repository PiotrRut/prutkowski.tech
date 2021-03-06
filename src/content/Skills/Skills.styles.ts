import { centredFlex } from '@theme/shortcuts';
import { palette, sizes } from '@theme/tokens';
import styled from 'styled-components';

export const SkillItem = styled.div`
  color: ${palette.white};
  display: inline-flex;
  padding: 0 ${sizes['12']};
  border-radius: ${sizes['base']};
  border: ${sizes['1']} solid ${palette.cyanBlue};
  height: ${sizes['32']};
  align-items: center;
  transition: 350ms;
  margin: ${sizes['10']};

  &:hover {
    transform: translateX(-${sizes['3']}) translateY(-${sizes['2']});
  }
`;

export const SkillsWrapper = styled.div`
  ${centredFlex}
  flex-wrap: wrap;
  direction: row;

  @media (min-width: 1024px) {
    width: 60%;
  }
`;
