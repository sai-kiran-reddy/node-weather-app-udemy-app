const request =  require('postman-request');
const chalk = require('chalk');

const forecast = (lattitude,longitude,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ec551e7c660f060ee6fcd4b72444c9ea&query=${lattitude},${longitude}&units=m`;
    request({url,json:true},(error,{body}) => {
    if(error){
        callback(chalk.red('please check network connectivity'),undefined);
    }
    else if(body.error)
    {
        callback(chalk.red('unable to find the location'));
    }
    else
    {
        const {current} = body;
        callback(undefined,("the current temparature is "+current.temperature+"c feels like "+current.feelslike + 'weather forecast : '+ current.weather_descriptions[0]));
    }
})
}
  module.exports = forecast;