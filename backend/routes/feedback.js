const express = require('express');
const router = express.Router();
const multer = require('multer');
const feedbackController = require('../controllers/feedbackController');

const upload = multer({ dest: 'uploads/' });

// Add error handling middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes with error handling
router.get('/', asyncHandler(feedbackController.getAllFeedbacks));
router.post('/assign', asyncHandler(feedbackController.assignToEmployee));
router.get('/assigned/:employee_id', asyncHandler(feedbackController.getAssignmentsForEmployee));
router.post('/response', asyncHandler(feedbackController.submitEmployeeResponse));
router.get('/responses/pending', asyncHandler(feedbackController.getPendingResponses));
router.post('/response/review', asyncHandler(feedbackController.hodApproveResponse));
router.get('/user/:user_id', asyncHandler(feedbackController.getUserFeedbacks));
router.post('/', upload.single('file'), asyncHandler(feedbackController.submitFeedback));
router.get('/check-emp1', asyncHandler(feedbackController.checkEmployeeDetails));
router.get('/check-all-employees', asyncHandler(feedbackController.checkAllEmployeeAssignments));
router.get('/tracking/:tracking_key', asyncHandler(feedbackController.getFeedbackByTrackingKey));

module.exports = router;
