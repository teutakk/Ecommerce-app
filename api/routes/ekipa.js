const Ekipa = require("../models/Ekipa")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.get("/", verifyToken, async(req, res) => {
    try {
        const ekipData = await Ekipa.find()
        res.status(200).json(ekipData)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/find/:id", verifyToken, async (req, res)=>{
    try {

        const ekipData = await Ekipa.findById(req.params.id)
        
        // // const { password, ...others} = ekipData._doc;

        res.status(200).json(ekipData);

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/postData", verifyToken, async(req, res) => {
    const newEkipe = new Ekipa(req.body)
    try {
        const saveEkipen = await newEkipe.save()
        res.status(200).json(saveEkipen)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", verifyToken, async (req, res)=>{
    
    try {
        const updatedEkipa = await Ekipa.findByIdAndUpdate(
        req.params.id, 
            {
                $set: req.body
            }, 
            { new: true })

        res.status(200).json(updatedEkipa);

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", verifyToken, async (req, res)=>{
    try {
        await Ekipa.findByIdAndDelete(req.params.id)
        res.status(200).json("Ekipa has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
