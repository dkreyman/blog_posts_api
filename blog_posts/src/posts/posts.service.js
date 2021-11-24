const axios = require('axios');
const API_BASE_URL = "https://api.hatchways.io/assessment/blog/posts";

async function getByTag(tag) {
  try{
    const url = `${API_BASE_URL}?tag=${tag}`;
    let res = await axios.get(url)
    let data = res.data.posts
    return data
  }catch (err) {
    console.log(err);
    return error.response;
  }
}

module.exports = {getByTag}