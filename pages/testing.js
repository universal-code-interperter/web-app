import { Container, Heading, Stack, Button } from "@chakra-ui/react";
// import {*} from "@chakra-ui/react";
import { useState } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
// import { python } from "prismjs/components/prism-python";
import { pythones } from "../prism_mod/prism-pythones";
// import { highlight } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another

export default function Testing() {
  const [code, setCode] = useState(
    'importar testing\n\na = entrada()\n\nsi a == "y o para" y Falso:\n    imprimir(a)\nmas:\n    imprimir("imprimir")\n\n'
  );

  const getTranslation = async (language, code) => {
    const url =
      "https://ls5f7275p37p4yp4x3h2evzsyu0wlhny.lambda-url.us-west-2.on.aws/";
    // create XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // open a POST request
    xhr.open("POST", url);
    // set content-type header to JSON
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // send JSON data to the remote server
    xhr.send(JSON.stringify({ code: code, language: language }));

    // Event Handlers

    // track data upload progress
    xhr.upload.onprogress = function (e) {
      console.log(`${e.loaded}B of ${e.total}B uploaded!`);
    };

    // triggered when data upload is finished
    xhr.upload.onload = function (e) {
      console.log("Upload completed");
    };

    // triggered when the response is fully received
    xhr.onload = function () {
      console.log(xhr.status);
    };

    // triggered due to a network-level error
    xhr.onerror = function () {
      console.log("Network error occurred");
    };
  };

  const userAction = async () => {
    const response = await fetch("/api/processcode", {
      method: "POST",
      body: JSON.stringify({ code: code, language: "es" }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch('api/processcode');
    // console.log(response);
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson);
  };

  function handleClick() {
    console.log(code);
    // userAction();
    getTranslation("es", code);
  }
  return (
    <Container centerContent>
      <Heading>Testing</Heading>
      <Editor
        readOnly={false}
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.pyes)}
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
