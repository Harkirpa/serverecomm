
const { blogController, electronicsController, laptopController, watchesController, booksController, dummyController,Success } = require('./categorycontroller');

const categoryRouter=require("express").Router();

categoryRouter.get("/blog",blogController)
categoryRouter.get("/electronics",electronicsController)
categoryRouter.get("/laptop",laptopController)
categoryRouter.get("/watches",watchesController)
categoryRouter.get("/books",booksController)
categoryRouter.get("/dummy",dummyController)
categoryRouter.get("/success",Success)
module.exports=categoryRouter;