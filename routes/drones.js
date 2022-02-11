const express = require('express');
const router = express.Router();
// require the Drone model here
const DroneModel = require('../models/Drone.model');


router.route('/drones/:id/edit')
.get((req, res) => {
  // Iteration #4: Update the drone
  const id = req.params.id;

  DroneModel.findById(id)
  .then((drone)=>{
    res.render("drones/update-form.hbs", drone);
  })
  .catch((error) => {
    console.log(`Error while finding the drone by id: ${error}`);
    res.render("drones/update-form.hbs");
  })
})
.post((req, res) => {
  // Iteration #4: Update the drone
  const id = req.params.id;

  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  DroneModel.findByIdAndUpdate(id, {name, propellers, maxSpeed}, {new: true})
  .then(editedDrone=>{
    res.redirect("/drones");
  })
  .catch((error) => {
    console.log(`Error while updating a new drone: ${error}`);
    res.render("drones/update-form.hbs");
  })
})

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