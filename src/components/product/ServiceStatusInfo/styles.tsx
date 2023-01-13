import styled from 'styled-components';
import { COLOR, MEDIA_QUERY } from '../../../utils';

export const Logo = styled.div`
  width: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 0.5rem;
  span {
    margin-left: 0.5rem;
  }
`;

export const RightMenu = styled.div`
  display: flex;
  align-items: center;

  ${MEDIA_QUERY.tablet} {
    line-height: normal;
  }
`;

export const ContractsInfoContainer = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  .registry-contract {
    display: flex;
    align-items: center;
  }
  img {
    margin-right: 8px;
  }
  .dot {
    display: inline-block;
    position: relative;
    top: -2px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }
  .dot-online {
    background-color: ${COLOR.GREEN_2};
  }
  .dot-offline {
    background-color: ${COLOR.ORANGE};
  }

  ${MEDIA_QUERY.mobileM} {
    flex-direction: column;
  }
`;

export const PoweredByLogo = styled.div`
  display: flex;
  margin-right: 1rem;
`;

export const NextUpdateTimer = styled.div`
  display: inline-flex;
  align-items: center;
  .ant-statistic {
    color: inherit;
  }
  .ant-statistic-content {
    font-weight: inherit;
    font-size: inherit;
    color: inherit;
  }
`;

export const FixedFooter = styled.div`
  position: fixed;
  bottom: 0;
  background: ${COLOR.WHITE};
  width: 100%;
  border-top: 1px solid ${COLOR.GREY_3};
`;
