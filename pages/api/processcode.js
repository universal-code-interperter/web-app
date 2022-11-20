import axios from "axios";


async function postData (language, code) {
  const payLoad = { 'code': code, 'language': language };
  // return payLoad;
  try {
    const response = await axios.post("https://ls5f7275p37p4yp4x3h2evzsyu0wlhny.lambda-url.us-west-2.on.aws/", payLoad)
    // console.log("Request successful!")
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status)
    } else {
      console.log(error.message)
      return error.message;
    }
  }
}

export default function handler(req, res) {
  
  const code = postData(req.body.language, req.body.code).then((data) => {
    // console.log(data);
    res.status(200).json({ translatedCode: data });
  });
  // res.status(200).json({ 'translatedCode': code});
  // res.status(200).json()
  
  }