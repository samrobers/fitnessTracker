const router = require("express").Router();

const { Workout } = require("../../models");

router.get("/", (req, res) => {
  console.log("get request");
  Workout.aggregate()
    .addFields({
      totalDuration: { $sum: "$exercises.duration" },
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

router.put("/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } }
  ).then((data) => {
    res.json(data);
  });
});

router.post("/", (req, res) => {
  Workout.create(req.body).then((data) => {
    res.json(data);
  });
});

router.get("/range", (req, res) => {
  Workout.aggregate()
    .addFields({
      totalDuration: { $sum: "$exercises.duration" },
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

module.exports = router;
