const express = require('express');
const router = express.Router();

const DroneC = require('../models/Drone.model.js');
// require the Drone model here

router.get('/drones', (req, res, next) => {

DroneC.find().then((Element) => res.render('drones/list.hbs', {drones:Element}))
      .catch(error => {
      console.log('Error while getting the drones from the DB: ', error);
      next(error);
    });

});

router.get('/drones/create', (req, res, next) =>  {
  res.render('drones/create-form.hbs')
});

router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
 
  DroneC.create({ name, propellers, maxSpeed }).then((Element) => res.redirect('/drones'))
    .catch(error => next(error));
});

router.get('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;
  DroneC.findById(id).then((Element) => {
    console.log(Element);
      res.render('drones/update-form.hbs', { bob: Element });
    })
    .catch((err) => {
      next(err);
    });

});

router.post('/drones/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  DroneC.findByIdAndUpdate(id, { name, propellers, maxSpeed }).then((Element) => {
    console.log(Element);

    res.redirect('/drones');
    })
    .catch((err) => {
      next(err);
    });

});

router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params;
  DroneC.findByIdAndDelete(id).then(() => res.redirect('/drones'))
    .catch(error => next(error));
});

module.exports = router;
