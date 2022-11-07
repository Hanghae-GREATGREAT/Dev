import { Router } from 'express';


const router = Router();


router.get('/', (req, res)=>{
    res.render('main.html')
});

router.get('/chat', (req, res)=>{
    res.render('chat.html')
});


export default router;