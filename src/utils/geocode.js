const request =  require('postman-request');
const chalk = require('chalk');

const geocode = (address,callback) =>
{

const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic3JlZGR5a2lyYW4iLCJhIjoiY2t0ZHY0dzAwMmprcTJ4bGFyejN3dzZvbSJ9.7NxaQlIqwj-4KfanVO0rig&limit=1`;
request({url,json:true},(error,{body} ={}) => {
if(error)
callback({message:'please check network connectivity'},undefined);
else if (body.message || body.features.length === 0)
callback({message:'unable to find the location please provide valid one niga'});
else
{
const {features} = body;
callback(undefined,{lattitude:features[0].center[1],longitude:features[0].center[0],
place: features[0].place_name})
}
})

}

module.exports = geocode