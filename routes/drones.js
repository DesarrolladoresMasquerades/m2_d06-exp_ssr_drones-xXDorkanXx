const express = require('express');
const router = express.Router();
// require the Drone model here
const DroneModel = require('../models/Drone.model');


router.route('/drones/:id/edit')
.get((req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
})
.post((req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

router.route('/drones/create')
.get((req, res) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
})
.post((req, res) => {
  // Iteration #3: Add a new drone
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  DroneModel.create({ name, propellers, maxSpeed})
  .then(() => {res.redirect("/drones")})
  .catch((error) => {
    console.log(`Error while creating a new drone: ${error}`);
    res.render("drones/create-form.hbs");
  });
});


router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  DroneModel.find()
  .then(drones=>{
    console.log(`Found ${drones.length} drones from the DB`);
    res.render("drones/list", {drones});
  })
  .catch((err)=> console.log(`DB error reading '/drones': ${err}`))
});

module.exports = router;
