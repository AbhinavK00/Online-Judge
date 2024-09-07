const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, getProfile, verifyUser, logoutUser, verifyAdmin } = require('../controllers/authController');
const { runComp, getStatus, submitComp } = require('../controllers/compController');
const { addQuestion, updateQuestion, deleteQuestion, seeQuestion, QuestionsList } = require('../controllers/crudController');
const checkAns = require('../helper/checkAns');


//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    })
);

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyUser);
router.get('/logout', logoutUser);
router.get('/profile', getProfile);
router.post('/submit/:id', submitComp);
router.post('/run/:id', runComp);
router.get('/status', getStatus);
router.post('/check/:id', checkAns);
router.get('/ques', verifyAdmin);
router.post('/ques/add', addQuestion);
router.get('/ques/list',QuestionsList);
router.get('/ques/:id', seeQuestion);
router.put('/ques/update/:id', updateQuestion);
router.delete('/ques/update/:id', deleteQuestion);

module.exports = router
