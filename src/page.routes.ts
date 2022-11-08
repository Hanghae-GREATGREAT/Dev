import { Router } from 'express';


const router = Router();


router.get('/front', (_, res)=>{
    res.render('front.html');
});

router.get('/', (req, res)=>{
    res.render('main.html');
});

router.get('/chat', (req, res)=>{
    res.render('chat.html');
});


export default router;