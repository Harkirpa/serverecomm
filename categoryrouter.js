// const { login, register ,searchproduct} = require('./signup/userControl');
const { blogController, electronicsController, laptopController, watchesController, booksController, dummyController } = require('./categorycontroller');

const categoryRouter=require("express").Router();

categoryRouter.get("/blog",blogController)
categoryRouter.get("/electronics",electronicsController)
categoryRouter.get("/laptop",laptopController)
categoryRouter.get("/watches",watchesController)
categoryRouter.get("/books",booksController)
categoryRouter.get("/dummy",dummyController)
// categoryRouter.post("/login",login)
// categoryRouter.post("/register",register)
// categoryRouter.get("/search", searchproduct);
module.exports=categoryRouter;