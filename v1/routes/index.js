import { Register } from "../controllers/auth.js";
import Validate from "../middleware/validate.js";
import { check } from "express-validator";
import { Login } from "../controllers/login.js";
const Router = (server) => {
  // home route with the get method and a handler
  server.get("/v1", (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        data: [],
        message: "Welcome to our API homepage!",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  });
  server.post(
    "/register",
    check("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
    check("first_name")
      .not()
      .isEmpty()
      .withMessage("You first name is required")
      .trim()
      .escape(),
    check("last_name")
      .not()
      .isEmpty()
      .withMessage("You last name is required")
      .trim()
      .escape(),
    check("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Must be at least 8 chars long"),

    Register
  );
  server.post(
    "/login",
    check("email")
      .isEmail()
      .withMessage("Enter a valid email address")
      .normalizeEmail(),
    check("password").not().isEmpty(),

    Login
  );
};
export default Router;
