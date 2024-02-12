const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5ZWE0NjFhMy1mMzE3LTQ4ZTgtYTcyNS0wYWMyZGE1ZTJmMTMiLCJlbWFpbCI6InBhdWxsYWJhdDEwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIxMzkzNTM1ZGFkODU3MzZiOTdmMCIsInNjb3BlZEtleVNlY3JldCI6IjFlZTlkMzc3ZjMzM2VjZjMyYTJlMzY0NmJhMzNjMjk2MWZkNmM5MzdkY2I3ZmZmNjI0ODhlMjcyYTNlYWIwZWYiLCJpYXQiOjE3MDc3NDkzMDh9.nzuP467blxQYG3S2Ope_ALyvhbAIUog3-41t9X2TWBU'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "verre.jpg";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
      });
      formData.append('pinataMetadata', pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      })
      formData.append('pinataOptions', pinataOptions);

      try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            'Authorization': `Bearer ${JWT}`
          }
        });
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
  }
  
  pinFileToIPFS()