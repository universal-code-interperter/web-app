import { Container, Heading, Stack, Button } from "@chakra-ui/react";
// import {*} from "@chakra-ui/react";
import { useState } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another




export default function Testing() {

  
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const userAction = async () => {
    // const response = await fetch('http://example.com/movies.json', {
    //   method: 'POST',
    //   body: myBody, // string or object
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    const response = await fetch('api/processcode');
    // console.log(response);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
  }

    function handleClick() {
      console.log(code);
      userAction();
      
    }
  return (
    <Container centerContent>
      <Heading>Testing</Heading>
      <Editor
      readOnly={false}
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={15}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          width: "100%",
        }}
      />
      <Button colorScheme="teal" size="md" margin={5} onClick={handleClick}>
          Translate Code
        </Button>
      {/* <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" size="xs">
          Button
        </Button>
        <Button colorScheme="teal" size="sm">
          Button
        </Button>
        <Button colorScheme="teal" size="md">
          Button
        </Button>
        <Button colorScheme="teal" size="lg">
          Button
        </Button>
      </Stack> */}
    </Container>
  );
}
