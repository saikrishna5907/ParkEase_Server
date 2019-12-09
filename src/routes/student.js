import express from 'express';
const router = express.Router();

const studentController = require('../controllers/student');
router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.postStudent);
router.get('/students/:id', studentController.getSingleStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);
module.exports = router;
// export default routes;

