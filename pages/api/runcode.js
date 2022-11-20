// import {PythonShell} from 'python-shell';
import { jsPython } from "jspython-interpreter";

export default function handler(req, res) {
  const code = req.body.code;
  console.log(code);
  const interpreter = jsPython();
  interpreter.evaluate(code).then((output) => {
    res.status(200).json({ output: output });
  }); // 5
  // res.status(200).json({ 'translatedCode': code});
  // res.status(200).json()
}
