import app from "./app";
import confiq from "./app/confiq";
import mongoose from 'mongoose'
import express from "express";
import bodyParser from "body-parser";

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
async function main() {
  try{
      await mongoose.connect(confiq.db_url as string);

app.listen(confiq.port, () => {
  console.log(`Example app listening on port ${confiq.port}`)
})


  }
  catch(err)
  {
    console.log(err);
  }


}
main();
