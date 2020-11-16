const router = require("express").Router();
const Todo = require("../models/todo.model");
const { body, validationResult } = require("express-validator");

/**
 * @request GET
 * @url /todos
 * @params  none
 * @response array
 */
router.get("/", async (req, res) => {
  try {
    let todos = await Todo.find();

    if (todos.length < 1) {
      return res.status(200).json({
        todos,
        meta: { count: todos.length, message: "no todos in storage!" },
      });
    }

    res.status(200).json({
      todos,
      meta: { count: todos.length, message: "successfully got todos!" },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "problem fetching data!", error });
  }
});

/**
 * @request POST
 * @returns success or error
 */
router.post(
  "/",
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let { title, description } = req.body;

      let todo = new Todo({ title, description });

      await todo.save();

      res.status(201).json({ message: "Todo has been added!" });
    } catch (error) {
      res.status(400).json({ message: "could not add todo to storage!" });
    }
  }
);

/**
 * @params string
 * @returns {}
 *
 */
router.get("/:id", async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: "could not add todo to storage!" });
  }
});

module.exports = router;
