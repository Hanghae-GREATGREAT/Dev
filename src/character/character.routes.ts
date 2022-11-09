import { Router } from "express";


const router = Router();


import CharacterService from './character.service'
router.get('/ctest', async(req, res)=>{
    const result = await CharacterService.refreshStatus(1, 10, 10);
    // const result = await CharacterService.addExp(1, 10);

    console.log(result);

    res.status(200).json({ result });
})


export default router;