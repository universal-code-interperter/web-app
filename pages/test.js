import { Container, Heading, Stack, Button } from "@chakra-ui/react";
// import {*} from "@chakra-ui/react";
import { useState } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { PythonShell } from "python-shell";

// imoprt {PythonShell}

export default function Testing() {

  const userAction = async () => {
    const response = await fetch("/api/runcode");
    // const response = await fetch('api/processcode');
    // console.log(response);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
    setTranslatedCode(myJson.translatedCode.code);
  };

  const handleClick = () => {
    userAction();
  };

  return (
    <Container centerContent>
      <Button colorScheme="teal" size="md" margin={5} onClick={handleClick}>
        Translate Code
      </Button>
    </Container>
  );
}
