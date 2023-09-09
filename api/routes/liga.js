const Liga = require("../models/Liga")
const Ekipa = require("../models/Ekipa")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


const router = require("express").Router();

router.get("/", verifyToken, async(req, res) => {
    try {
        const ligaData = await Liga.find()
        res.status(200).json(ligaData)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/find/:id", verifyToken, async (req, res)=>{
    try {

        const ligaData = await Liga.findById(req.params.id)

        res.status(200).json(ligaData);

    } catch (error) {
        res.status(500).json(error)
    }
})
router.post("/postLiga", verifyToken, async(req, res) => {
    const newLiga = new Liga(req.body)
    try {
        const saveLiga = await newLiga.save()
        res.status(200).json(saveLiga)

    } catch (error) {
        res.status(500).json(error)
    }
})
//Update liga
router.put("/:id", verifyToken, async (req, res)=>{
    
    try {
        const updatedLia = await Liga.findByIdAndUpdate(
        req.params.id, 
            {
                $set: req.body
            }, 
            { new: true })

        res.status(200).json(updatedLia);

    } catch (error) {
        res.status(500).json(error)
    }
})
router.delete("/:id", verifyToken, async (req, res)=>{
    try {
    
        const deletedLiga = await Liga.findByIdAndDelete(req.params.id);
        
        // Delete related Ekipa instances
        await Ekipa.deleteMany({ liga: req.params.id });

        res.status(200).json("Liga has been deleted")

        // await Liga.findByIdAndDelete(req.params.id)
        // res.status(200).json("Liga has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router
