const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//Create product
router.post("/", verifyTokenAndAdmin, async (req, res)=>{

    const newProduct = new Product(req.body)

    try {
        
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)

    } catch (error) {
        res.status(500).json(error)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res)=>{
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, 
            {
                $set: req.body
            }, 
            { new: true })

        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json(error)
    }
})

// //DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET PRODUCT
router.get("/find/:id", async (req, res)=>{
    try {

        const product = await Product.findById(req.params.id)
        
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL PRODUCTS
router.get("/", async (req, res)=>{

    const qNew = req.query.new
    const qCategory = req.query.category

    try {
        let products;
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        }else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],

                }   
            })
        }else{
            products = await Product.find()
        }
        res.status(200).json(products);

    } catch (error) {
        res.status(500).json(error)
    }
})

  
// router.get("/", async(req, res) => {
//     const { q } = req.query;

//     const keys = ["title"];

//     const search = (data) => {
//         return data.filter((item) => 
//         keys.some((key) => item[key].toLowerCase().includes(q))
//         )
//     }
//     res.json(search(product).splice(0, 10))
// })

// router.get("/", (req, res) => {
//     const { q } = req.query;
  
//     const keys = ["title"];
  
//     const search = (data) => {
//       return data.filter((item) =>
//         keys.some((key) => item[key].toLowerCase().includes(q))
//       );
//     };
  
//     q ? res.json(search(product).slice(0, 10)) : res.json(product.slice(0, 10));
//   });

module.exports = router