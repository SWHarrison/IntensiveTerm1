//participants.js

const Participant = require('../models/participant')
const Study = require('../models/study')
const _ = require('lodash');

module.exports = function (app) {

  app.get('/participants/index', (req, res) => {
    Participant.find()
      .then(participants => {

        //const dudes = _.filter(participants, {sex: "female"});
        //const olds = _.filter(participants, ({age}) => age >= 26)
        res.render('participants-index', {participants: participants});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // NEW
  app.get('/participants/new', (req, res) => {
    res.render('participants-new', {});
  })

  //SHOW
  app.get('/participants/:id', (req, res) => {
    // find participant
    Participant.findById(req.params.id).then(participant => {
        res.render('participants-show', {participant: participant})
      // fetch its donations
      /*Donation.find({ participantId: req.params.id }).then(donations => {
        // respond with the template with both values
        res.render('participants-show', { participant: participant, donations: donations })*/
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
  });

  // CREATE
  app.post('/participants', (req, res) => {
    Participant.create(req.body).then((participant) => {
      console.log(participant)
      res.redirect(`/participants/${participant._id}`) // Redirect to participants/:id
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // UPDATE
  app.put('/participants/:id', (req, res) => {
    Participant.findByIdAndUpdate(req.params.id, req.body)
      .then(participant => {
        res.redirect(`/participants/${participant._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // EDIT
  app.get('/participants/:id/edit', function (req, res) {
      console.log('This is the request body' + req.body)
    Participant.findById(req.params.id, function(err, participant) {
      res.render('participants-edit', {participant: participant});
    })
  })

  // DELETE
  app.delete('/participants/:id', function (req, res) {
    console.log("DELETE participant")
    Participant.findByIdAndRemove(req.params.id).then((participant) => {
      res.redirect('/participants/index');
    }).catch((err) => {
      console.log(err.message);
    })
  })
}
