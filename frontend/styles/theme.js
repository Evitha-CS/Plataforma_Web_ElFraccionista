import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  initialColorMode: 'system',
  useSystemColorMode: true,
  fonts: {
    heading: `'Press Start 2P', sans-serif`,
    body: `'Press Start 2P', sans-serif`,
  },
  colors: {
    myColor: {
      Eminence: "#5d3c81",
      DarkPink: "#E94F88",
      Snow: "#f6f2f2",
      GrayMelange:"#CCCAC9",
      LemonLime: "#eaff00"
    }
  },
  styles: {
    global: (props) => ({
      '::-webkit-scrollbar': {
        width: '10px'
      },
      '::-webkit-scrollbar-track': {
        background: mode('gray.50', 'gray.800')(props),
      },
      '::-webkit-scrollbar-thumb': {
        background: mode('gray.400', 'gray.600')(props),
        borderRadius: '10px'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: mode('gray.500', 'gray.500')(props)
      },
    })
  }
})

export default theme
