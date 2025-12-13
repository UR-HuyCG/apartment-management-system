const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const {
  createHouseholdPayment,
  listHouseholdPayments,
  getHouseholdPaymentById,
} = require("../controllers/householdPaymentController");

router.post(
  "/",
  [
    body("householdId")
      .isInt({ min: 1 })
      .withMessage("householdId must be an integer")
      .toInt(),

    body("paymentTypeId")
      .isInt({ min: 1 })
      .withMessage("paymentTypeId must be an integer")
      .toInt(),

    body("amountExpected")
      .isFloat({ min: 0 })
      .withMessage("amountExpected must be >= 0")
      .toFloat(),

    body("amountPaid")
      .isFloat({ min: 0 })
      .withMessage("amountPaid must be >= 0")
      .toFloat(),

    body("status")
      .isIn(["PAID", "UNPAID", "PARTIAL", "OVERDUE"])
      .withMessage("Invalid payment status"),

    body("category")
      .isIn(["MANDATORY_SANITATION", "VOLUNTARY_CONTRIBUTION"])
      .withMessage("Invalid fee category"),

    body("paymentDate")
      .optional()
      .isISO8601()
      .withMessage("paymentDate must be ISO8601")
      .toDate(),

    body("dueDate")
      .optional()
      .isISO8601()
      .withMessage("dueDate must be ISO8601")
      .toDate(),

    body("notes").optional().isString().trim(),
  ],
  createHouseholdPayment
);

// List all household payments
router.get("/", listHouseholdPayments);

// Get household payment by id
router.get("/:id", [param("id").isInt().toInt()], getHouseholdPaymentById);

module.exports = router;
