const moment = require("moment")
function date_evaluate(date){
    date =moment(date)
    let relative_date = date.fromNow()
    let resulting_date=""   
    if(relative_date[2]==='d' || relative_date[3]==='d'){
             
      if(relative_date.charCodeAt(0)>=50 && relative_date.charCodeAt(0)<=54) 
      resulting_date=date.calendar().split(" ")[0]+" "+date.calendar().split(" ")[1]
        
      resulting_date=date.format("MMMM D")
    }else if(relative_date.includes("mo")){
      resulting_date=date.format("MMMM D")
    }else if (relative_date[2]==='y' || relative_date[3]==='y'){
      resulting_date=date.format("MMM D YYYY").split(" ").splice(0)[0]+" "+
      date.format("MMM D YYYY").split(" ").splice(1)[0]+", "+
      date.format("MMM D YYYY").split(" ").splice(2)[0]
    }
    else{
      resulting_date=relative_date
    }
    return resulting_date
}

module.exports = { date_evaluate }