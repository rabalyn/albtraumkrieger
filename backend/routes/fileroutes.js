var fs = require("fs");
var path = require('path');
var writePath = '/home/saurabh/Documents/react/cloudprint/filestobeprinted/';
var cmd = require('node-cmd');
var async = require('async');
var jsonfile = require('jsonfile');
// var bcrypt = require('bcrypt');
var jsonfile = require('jsonfile');

const config = require('../config')

import Gw2members from '../lib/gw2-members'
const gw2members = new Gw2members({
  apiKey: config.api.guildToken,
  guildId: config.api.guildId
})

import Gw2hall from '../lib/gw2-guildhall'
const gw2hall = new Gw2hall({
  apiKey: config.api.guildToken,
  guildId: config.api.guildId
})

gw2members.loadMembers()
gw2hall.loadLog()

exports.members = (req, res) => {
  return res.send({
    "code": 200,
    "result": gw2members.getMembers()
  })
}

exports.guildhall = (req, res) => {
  return res.send({
    "code": 200,
    "result": gw2hall.getLog()
  })
}

exports.fileprint = function (req, res) {
  // console.log("req",req.files);
  var filesArray = req.files;
  var filepath = './userdata/userid.json'
  jsonfile.readFile(filepath, function (err, obj) {
    var userid = obj.userid;
    
  });
  async.each(filesArray, function (file, eachcallback) {
    async.waterfall([
      function (callback) {
        fs.readFile(file.path, (err, data) => {
          if (err) {
            console.log("err ocurred", err);
          }
          else {
            callback(null, data);
          }
        });
      },
      function (data, callback) {
        fs.writeFile(writePath + file.originalname, data, (err) => {
          if (err) {
            console.log("error occured", err);
          }
          else {
            callback(null, 'three');
          }
        });
      },
      function (arg1, callback) {
        var filepath = './userdata/userid.json'
        jsonfile.readFile(filepath, function (err, obj) {
          var userid = obj.userid;
          

          // console.log("user id in read file",userid);
          var swiftcommand = 'swift -A http://127.0.0.1:12345/auth/v1.0 -U test:tester -K testing upload --object-name ' + file.originalname + ' ' + userid + ' ' + '../filestobeprinted/' + file.originalname;
          // console.log("command",swiftcommand);
          cmd.get(
            swiftcommand,
            function (data) {
              console.log('the responses is : ', data)
              callback(null, 'done');
            }
          );
        })

      },
      function (arg2, callback) {
        // console.log("callback recieved",arg2);
        //run printing commands here
        // cmd.get('lpr '+writePath + file.originalname,
        //         function(data){
        callback(null, "done printing files");
        //         })
      }
    ], function (err, result) {
      // result now equals 'done'
      // console.log("waterfall result",file.originalname);
      eachcallback();
    });
  }, function (err) {
    if (err) {
      console.log("error ocurred in each", err);
    }
    else {
      console.log("finished prcessing");
      res.send({
        "code": "200",
        "success": "files printed successfully"
      })
      cmd.run('rm -rf ./fileprint/*');
    }
  });

}