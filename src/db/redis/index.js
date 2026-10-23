const {createClient} = require("redis");

const client = await createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();


  module.exports = {client}
  
