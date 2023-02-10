import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

.notosanskr * { 
 font-family: 'Noto Sans KR', sans-serif;
}

* {
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
}

}
`

export default GlobalStyle
