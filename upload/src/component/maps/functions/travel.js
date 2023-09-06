import axios from "axios";


export const create = async(data)=>
    await axios.post('http://location:5000/api/travel',data);

// export const list = async() => {
    
//     const accessToken = '43|oW4862L57RnbZ581tyEEWmm1xgYKo0AS4ndQ6caG';
//     return await axios.get("http://172.23.106.164:8000/api/markets",{
//         headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//     })
// }



export const list = async() => {
    
   
    return await axios.get("http://localhost:3000/market")
}

