import styled from 'styled-components';
import { COLOR } from '../../../utils';

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: normal;
  .unsupported-network {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    color: ${COLOR.ORANGE};
    .anticon-caret-down {
      margin-left: 0.25rem;
    }
    .anticon-warning {
      margin-right: 0.5rem;
    }
  }
`;
