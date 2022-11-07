import { Router } from 'express';


const router = Router();


router.get('/', (req, res)=>{
    res.render('main.html')
});


export default router;