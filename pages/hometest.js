import React from 'react'
import { Box, ChakraProvider,Container,Image,Spacer, Flex, Heading,ButtonGroup,Button, Text, Center,ArrowForwardIcon } from "@chakra-ui/react"

const hometest = () => {
  const [value, setValue] = React.useState(false);
  return(
  //   <div bgGradient='linear(to-r, green.200, pink.500)'
  //   style={{

  //     width: 'auto',
  //     height: 'auto'
  //   }}
  // >
  //   test
  // </div>
  <>

  <Text align="center"
  bgGradient='linear(to-l, #7928CA, #FF0080)'
  bgClip='text'
  fontSize='6xl'
  fontWeight='extrabold'
  >
  Welcome to Universial Code Interpreter
  </Text>
  <Flex align="center" marginLeft='10%' marginRight='10%'  justify="center" color='white'>
      <Image h="400" src='SecondLogoImage.jpg' alt='Dan Abramov' />
  </Flex>
  <Flex align="center" marginLeft='10%' marginRight='10%'  justify="center" color='white'>
    <Button 
    colorScheme='purple'
    isLoading={value} 
    onClick ={() => setValue(true)}
    >Translate</Button>
  </Flex>

</>
    
  );
}
export default hometest;