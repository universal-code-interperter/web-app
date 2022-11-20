import { Container, Heading, Stack, Button } from "@chakra-ui/react";
// import {*} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import { python } from "prismjs/components/prism-python";
import { pythones } from "../prism_mod/prism-pythones";
// import { highlight } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another

// import { XTerm } from 'xterm-for-react'

export default function Testing() {
  // const xtermRef = useRef(null)

  // useEffect(() => {
  //     // You can call any method in XTerm.js by using 'xterm xtermRef.current.terminal.[What you want to call]
  //     xtermRef.current.terminal.writeln("Hello, World!")
  // }, [])

  const [code, setCode] = useState(
    'importar testing\n\na = entrada()\n\nsi a == "y o para" y Falso:\n    imprimir(a)\nmas:\n    imprimir("imprimir")\n\n'
  );
  const [translatedCode, setTranslatedCode] = useState(
    "# Normal Python code will go here!"
  );
  const [output, setOutput] = useState("Output will go here!");

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
    setTranslatedCode(myJson.translatedCode.code);

    const body2 = JSON.stringify({ code: myJson.translatedCode.code });
    console.log(body2)
    const response2 = await fetch("/api/runcode", {
      method: "POST",
      body: body2,
      // body: { code: translatedCode },
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch('api/processcode');
    // console.log(response);
    const myJson2 = await response2.json();
    setOutput(myJson2.output);
    console.log(myJson2);
  };

  const hightlightWithLineNumbers = (input, language) =>
    highlight(input, language)
      .split("\n")
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join("\n");

  function handleClick() {
    console.log(code);
    userAction();
    // getTranslation("es", code);
  }
  return (
    <Container centerContent>
      <Heading>Testing</Heading>
      <Stack direction="row" spacing={4}>
        <Editor
          readOnly={false}
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => hightlightWithLineNumbers(code, languages.pyes)}
          padding={15}
          className="editor"
          textareaId="codeArea"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: "100%",
          }}
        />
        <Editor
          readOnly={true}
          value={translatedCode}
          onValueChange={(translatedCode) => setTranslatedCode(translatedCode)}
          highlight={(translatedCode) =>
            hightlightWithLineNumbers(translatedCode, languages.py)
          }
          padding={15}
          className="editor"
          textareaId="codeArea"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            width: "100%",
          }}
        />
      </Stack>
      <Button colorScheme="teal" size="md" margin={5} onClick={handleClick}>
        Translate Code
      </Button>

      <h2>Output</h2>
      <p>{output}</p>

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
