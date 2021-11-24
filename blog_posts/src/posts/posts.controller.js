const service = require("./posts.service");
const asyncErrorBoundary = require("../error/asyncErrorBoundary")


function ping(_,res){
  res.json({"success": true})
}

function isValidQuery(req, _, next){
  let {sortBy, tags, direction} = req.query
  if(!direction){
    direction = 'asc'
    req.query.direction = 'asc'
  }
  if(!sortBy){
    sortBy = "id"
    req.query.sortBy = "id"
  }
  if(!tags){
    return next({status: 400, message:"tags parameter is required"})
  }
  if(direction != 'asc' && direction != 'desc'){
    return next({status: 400, message: "direction parameter is invalid"})
  }
  if(sortBy != "id" && sortBy != "reads" && sortBy != "likes" && sortBy != "popularity"){
    return next({status: 400, message: "sortBy parameter is invalid"})
  }
  return next()
}

async function getData(req,res, next){
  try {
    let tags = req.query.tags.split(",")
    const promises = tags.map((tag)=>service.getByTag(tag))
    let apiPosts = await Promise.all(promises);
    if (apiPosts) {
      const result = [];
      const map = new Map();
      for (const post of apiPosts.flat()) {
        if(!map.has(post.id)){
          map.set(post.id, true);
          result.push(post);
        }
      }
      res.locals.posts = result
      return next()
    }
    next({ status: 404, message: `Post cannot be found.` });
  } catch (err) {
    next({
      status: 500,
      message: "Something went wrong looking for post existance",
    });
  }
}

function sort(req,res, _){
  const {sortBy, direction} = req.query
  let sortWay = direction === 'asc' ? function compare(a,b){ return a[sortBy] - b[sortBy]} : function compare(a,b){ return b[sortBy] - a[sortBy]}
  let sorted = res.locals.posts.sort(sortWay)
  return res.json({posts: sorted})
}



module.exports = {
  ping,
  read: [isValidQuery, asyncErrorBoundary(getData), sort]
};

