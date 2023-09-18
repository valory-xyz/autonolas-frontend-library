import { createGlobalStyle } from 'styled-components';

// const GlobalStyles = styled.div`
const GlobalStyle = createGlobalStyle`
  .m-0 {
    margin: 0 !important;
  }
  .mt-16 {
    margin-top: 16px;
  }
  .mr-12 {
    margin-right: 12px;
  }
  .mr-24 {
    margin-right: 24px;
  }
  .mr-32 {
    margin-right: 32px;
  }
  .mb-8 {
    margin-bottom: 8px;
  }
  .mb-16 {
    margin-bottom: 16px;
  }
  .ml-8 {
    margin-left: 8px;
  }
  .ml-16 {
    margin-left: 16px;
  }
  .align-right {
    text-align: right;
  }
`;

export default GlobalStyle;
