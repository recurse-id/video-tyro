
const path = require('path');
const mongoose = require('mongoose');
let playlistModel = require('./models/playlist')
let videoModel = require('./models/video')
const vttToJson = require('vtt-to-json')

var express = require('express');

var app = express();

var url = process.env.MONGO_PRODUCTION_URL

const YOUTUBE_PREFIX = 'https://www.youtube.com/watch'

const PLAYLIST_PREFIX = 'https://www.youtube.com/playlist?list='

mongoose
  .connect(
    url,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



function generateUrl(id) {
  return `${YOUTUBE_PREFIX}?v=${id}`
}

app.get('/api/load_random', function(req, res){

  var tag = decodeURI(req.query.tag) || "machine learning"
  var limit = Number(req.query.limit) || 16
  // q = videoModel.find({tags:tag}).limit(limit)
  q = videoModel.aggregate([{$match: {tags:tag}}, {$sample: {size: limit}}])
  var promise = q.exec(function(err, docs){
    var addedUrl = docs.map(doc => {
      const docwithUrl = Object.assign({}, doc)
      docwithUrl['urls'] = [generateUrl(doc['id'])]
      return docwithUrl
    })
    //console.log(addedUrl)
    res.send(addedUrl)
  })

});

async function getSubtitlesLocationsForTerm(term, doc){
  let subtitles = doc['subtitles']
  let id = doc['id']

  var urls = []
  let vttJson = await vttToJson(subtitles)
  vttJson.forEach(sub => {
    if (sub['part'].toLowerCase().includes(term.toLowerCase())){
      //console.log(sub['part'], ' includes ', term)
      urls.push(`${YOUTUBE_PREFIX}?v=${id}&t=${Math.trunc(sub['start'] / 1000)}`) //because time is in ms and youtube expects seconds
    }
  })

  if (urls.length === 0){
    // console.log(JSON.stringify(vttJson, null, '\t'))
    // console.log(subtitles)
    urls.push(`${YOUTUBE_PREFIX}?v=${id}`)
  }
  const docwithUrl = Object.assign({}, doc._doc)
  docwithUrl['urls'] = urls
  // console.log(docwithUrl)
  return docwithUrl
}

app.get('/api/search', function (req, res){
  var searchTerm = decodeURI(req.query.q)
  console.log(`"${searchTerm}"`)
  var limit = Number(req.query.limit) || 50
  q = videoModel.find( { $text: { $search : `"${searchTerm}"` , $caseSensitive: false}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})
    .limit(limit)
  q.exec(function(err, docs){
    if(err) {console.log(err)}
    let results = docs.map(d => {
      return new Promise(function (resolve, reject) {
        resolve(getSubtitlesLocationsForTerm(searchTerm, d))
      })
    })
    Promise.all(results).then(function(values) {
      res.send(values)
    })
  })
})

app.get('/api/catalog', function (req, res) {
  q = playlistModel.find({}, {})
  q.exec(function(err, docs){
    if(err) {console.log(err)}
    var results = docs.map(d => {
      return {url: PLAYLIST_PREFIX+d['id'], title: d['title']}
    })
    res.send(results)
  })

})

app.use(express.static(path.join(__dirname, 'build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 80);



