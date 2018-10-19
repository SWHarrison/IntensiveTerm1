const Participant = require('../models/participant')
const Study = require('../models/study')
const _ = require('lodash');

module.exports = function (app) {

  app.get('/', (req, res) => {
        res.render('home');
  });

  app.get('/studies/index', (req, res) => {
    Study.find()
      .then(studies => {
        // const dudes = _.filter(studies, {name: "dude"});

        res.render('studies-index', {studies: studies});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // NEW
  app.get('/studies/new', (req, res) => {
    res.render('studies-new', {});
  })

  //SHOW
  app.get('/studies/:id', (req, res) => {
    Study.findById(req.params.id).then(study => {

        Participant.find({ studies: req.params.id }).then(participants =>{

            res.render('studies-show', {study: study, participants: participants})
        })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
  });

 /*app.get('/review/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      Comment.find({ reviewId: req.params.id }).then(comments => {
        // respond with the template with both values
        res.render('reviews-show', { review: review, comments: comments })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
});*/

  // CREATE
  app.post('/studies', (req, res) => {
    Study.create(req.body).then((study) => {
      console.log(study)
      res.redirect(`/studies/${study._id}`) // Redirect to studies/:id
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // UPDATE
  app.put('/studies/:id', (req, res) => {
    Study.findByIdAndUpdate(req.params.id, req.body)
      .then(study => {
        res.redirect(`/studies/${study._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // EDIT
  app.get('/studies/:id/edit', function (req, res) {
      //console.log('This is the request body' + req.body)
    Study.findById(req.params.id, function(err, study) {
      res.render('studies-edit', {study: study});
    })
  })

  // DELETE
  app.delete('/studies/:id', function (req, res) {
    console.log("DELETE study")
    Study.findByIdAndRemove(req.params.id).then((study) => {
      res.redirect('/studies/index');
    }).catch((err) => {
      console.log(err.message);
    })
  })

  app.get('/studies/:id/request', function (req, res) {
      Study.findById(req.params.id).then(study => {
          res.render('studies-request', {study: study})
        }).catch((err) => {
          // catch errors
          console.log(err.message)
        });
  })

  app.post('/studies/:id/request/participants', (req, res) => {

    Study.findById(req.params.id).then(study => {
        const minAge = req.body.minimumAge || 0;
        const maxAge = req.body.maximumAge || 999;
        //const numParticipants = req.body.numRequest || study.number_of_participants
        const numParticipants = study.number_of_participants

        //console.log(req.body)

        Participant.find({
            age: { $gte: minAge, $lte: maxAge },
            sex: req.body.sex,
        }).then(participants => {
            // const dudes = _.filter(participants, ({age}) => age > 30);
            /*if(req.body.addOrNew == "add"){

                _.filter(participants,({_id :study.participants}))
            } else {
                study.participants = _.take(participants,0)
                console.log("this ran")
            }*/
            //console.log(participants)
            //console.log("this is the current study participants")

            //console.log("end of current")
            //console.log(participants)
            participants = _.sampleSize(participants, numParticipants)
            //console.log(participants)
            for (participant of participants){

                console.log(participant.studies)

                if(participant.studies.indexOf(req.params.id) == -1){
                        participant.studies.push(req.params.id);
                }

                console.log("should remove uniques")
                console.log(participant.studies)
                participant.save();
            }

            //participants = _.concat(participants, study.participants)

            study.participants = participants
            study.save();
            //console.log(study.participants)
            //console.log("last log")

            res.render('participants-results', {participants: participants});
        }).catch(err => {
            console.log(err);
        });

    })
  });

  app.get('/studies/:id/complete', function (req, res) {
      //console.log('This is the request body' + req.body)
    Study.findById(req.params.id, function(err, study) {
      res.render('studies-complete', {study: study});
    })
  })

  // UPDATE
  app.put('/studies/:id', (req, res) => {
    Study.findByIdAndUpdate(req.params.id, req.body)
      .then(study => {
        res.redirect(`/studies/${study._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })
}
