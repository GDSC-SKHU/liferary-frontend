import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

.notosanskr * { 
 font-family: 'Noto Sans KR', sans-serif;
}

* {
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
    margin: 0;
}

:root {
    --color-light: #A0C3FD;
    --color-normal: #72A4F7;
    --color-main: #4285F4;
    --color-deep: #2A75F3;
  }
`;

export default GlobalStyle;
