// note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  
  //get multiple entries of a certain data type
  app.get('/ariadata/:type', (req, res) => {
    var datatype = String(req.params.type);
    var query = { data_type: datatype };
    var option = {projection:{ _id: 0} };
    
    db.collection("ariadata").find({}, option).toArray(function(err, data) {
      if (err) throw error;
        console.log(data);
        res.send(data);
      //db.close();
    });
  });
  
  //get single entry (deprecated)
  /*app.get('/ariadata/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('ariadata').findOne(details, { "_id": 0}, (err, data) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(data);
      }
    });
  });*/
  
  //delete single entry
  app.delete('/ariadata/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('ariadata').findOneAndDelete(details, (err, data) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('ariadata ' + id + ' deleted!');
      } 
    });
  });
  
  //add entry
  app.post('/ariadata', (req, res) => {
    const data = { baby_name: req.body.baby_name, data_type: req.body.data_type, data_value: req.body.data_value, data_date: req.body.data_date, data_time: req.body.data_time };
    db.collection('ariadata').insert(data, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        console.log("Received data: " + JSON.stringify(data));
        res.send(result.ops[0]);
      }
    });
  });
  
  //update existing entry
  app.put('/ariadata/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const data = { baby_name: req.body.baby_name, data_type: req.body.data_type, data_value: req.body.data_value, data_date: req.body.data_date, data_time: req.body.data_time };
    db.collection('ariadata').update(details, data, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(data);
      } 
    });
  });
  
};