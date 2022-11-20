const getTranslation = async (language, code) => {
  try{
  const response = await fetch("https://ls5f7275p37p4yp4x3h2evzsyu0wlhny.lambda-url.us-west-2.on.aws/", {
    method: "POST",
    body: JSON.stringify({ 'code': code, 'language': language }),
  headers: {
    "Content-Type": "application/json"
  }
  });
  return response.status;
}
catch(e){
  return e;
}
};

const test = async () => {
  const res = await
  fetch("https://ls5f7275p37p4yp4x3h2evzsyu0wlhny.lambda-url.us-west-2.on.aws/");
  const allPostsData = await res.json();
  return allPostsData;
}


export default function handler(req, res) {
  
  try{
    // const translatedCode = getTranslation(req.body.language, req.body.code);
 
    // res.status(200).json({ 'translatedCode': translatedCode })
  }
  catch (e) {
    req.status(500).json({ error: e });
  }
  res.status(200).json()
  
  }