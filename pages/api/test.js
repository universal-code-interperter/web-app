const getTranslation = async (language, code) => {
  const response = await fetch(
    "https://ls5f7275p37p4yp4x3h2evzsyu0wlhny.lambda-url.us-west-2.on.aws/",
    {
      method: "POST",
      body: JSON.stringify({ code: code, language: language }),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    }
  );

  const myJson = await response.json(); //extract JSON from the http response
  // console.log("hi");
  console.log(myJson);
  console.log(myJson.body);
  console.log(response);
  return myJson.body;
};

export default function handler(req, res) {
  const code =
    'importar testing\n\na = entrada()\n\nsi a == "y o para" y Falso:\n    imprimir(a)\nmas:\n    imprimir("imprimir")\n\n';
  const translatedCode = getTranslation("es", code);
  console.log("test");
  console.log(translatedCode);

  res.status(200).json({ translatedCode: translatedCode });
}
