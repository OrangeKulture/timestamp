var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:time', function(req,res){
  let time = req.params.time;

  function getNatural(val){
    let date = new Date(val * 1000);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let month = months[date.getMonth()];
    let day = date.getDate();
    let year = date.getFullYear();

    let resp = month + ' ' + day +', '+year;
    return resp;
  }

  if(!isNaN(time)){
    let data = getNatural(time);
    let obj = { unix: time, natural: data};
    res.json(obj);
  }else {
    let natural = new Date(time);
    if(!isNaN(natural)){
      let unix = natural / 1000;
      let objNat = { unix: unix, natural: time};
      res.json(objNat);
    }else{
      res.json({ unix: null, natural: null});
    }
  }

});

module.exports = router;
