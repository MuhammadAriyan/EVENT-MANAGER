#!/usr/bin/env node
import chalk from "chalk";
import figlet from "figlet"
import { User } from "./construct.js";
import inquirer from 'inquirer';
import PressToContinuePrompt from 'inquirer-press-to-continue';
inquirer.registerPrompt('press-to-continue', PressToContinuePrompt);
import type { KeyDescriptor } from 'inquirer-press-to-continue';
import { Event } from "./eventMaker.js";
import { UserManager } from "./manager.js";
import { Bank } from "./bank.js";

let userManager = new UserManager()
let bankAccounts:Bank[] =[]
let bankAccountIsMade = false

//events 
let newYear = new Event(`NEW YEAR'S PARTY EXTRAVAGANZA`,"11PM-2AM / 31 DEC 2024",2000,`Join us for an unforgettable New Year's Eve Party Extravaganza! Celebrate the end of the year in style with an evening filled with excitement, entertainment, and elegance.`)
let winterLand = new Event('Winter Wonderland Festival'.toLocaleUpperCase(),"7PM-2AM / EVERY SUNDAY",200,`Experience the magic of the season at our Winter Wonderland Festival. Stroll through a village of sparkling lights and festive decorations, and enjoy ice skating, hot cocoa, and holiday treats`)
let watchParty = new Event("ANIME OVERFLOW WATCH PARTY","11PM-1AM",2000,`Overflow" in a cozy, immersive setting. Enjoy the show on a large screen with surround sound for the ultimate viewing experience. We'll provide a variety for the cosplay. Let’s dive into the world of "Overflow" together!`)

let events = [newYear,winterLand,watchParty]
let eventsName = []
for(let i=0;i<events.length;i++) {
  let a = events[i].eventname 
  eventsName.push(a)
}
let tickets:string[] = []
let purchaseHistory:string[] = []
let optionsForUser:string[] = [chalk.rgb(255,238,153)("VIEW PROFILE"),chalk.rgb(255,238,153)("VIEW PURCHASE HISTORY"),chalk.rgb(255,238,153)("BROWSE EVENTS"),chalk.rgb(255,238,153)("VIEW TICKETS"),chalk.rgb(255,238,153)("QUIT")]
let optionForadmin:string[] = [chalk.rgb(255,238,153)("ADD EVENTS"),chalk.rgb(255,238,153)("VIEW EVENTS"),chalk.rgb(255,238,153)("DELETE EVENTS"),chalk.rgb(255,238,153)("QUIT")]

const { key: enterKey } = await inquirer.prompt<{ key: KeyDescriptor }>({
  name: 'key',
  type: 'press-to-continue',
  enter: true,
});


console.log(`\n`);

figlet('ONLINE TICKETING SYSTEM',function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
})
setTimeout(async()=>{

console.log();

let choiceForAccount = await inquirer.prompt({
  name:"account",
  type:"list",
  message:chalk.rgb(128,255,102)(`WHAT WOULD YOU LIKE TO ACCESS`),
  choices: [chalk.rgb(0,153,128)(`ADMIN`),chalk.rgb(255,255,51)(`USER`)]
})
const id = choiceForAccount.account
if(id===chalk.rgb(0,153,128)(`ADMIN`)){
  while(true){
    let browse = await inquirer.prompt({
      name:"options",
      type:"list",
      message: chalk.rgb(127,255,107)("SELECT :"),
      choices: optionForadmin
    })
      const decision =browse.options
  
    //,,,chalk.rgb(255,238,153)("QUIT")]
    
 if(decision===chalk.rgb(255,238,153)("ADD EVENTS")){
        
  let nameOfEvent = await inquirer.prompt({
      name:"eventName",
      type:"input",
      message:chalk.rgb(102,190,0)("EVENT NAME:")
  })
  let timeOfEvent = await inquirer.prompt({
      name:"eventTime",
      type:"input",
      message: chalk.rgb(212,102,10)("EVENT TIME:")
  })
  
  let price = await inquirer.prompt({
    name:"eventPrice",
    type:"number",
    message: chalk.rgb(21,215,0)("PRICE:")
})

  let description = await inquirer.prompt({
      name:"eventDescription",
      type:"input",
      message:chalk.rgb(212,255,0)("DESCRIPTION:")
  })

  let newEvent = new Event(nameOfEvent.eventName,timeOfEvent.eventTime,price.eventPrice,description.eventDescription)

      events.push(newEvent)
      eventsName.push(nameOfEvent.eventName)
      console.log(chalk.rgb(0,170,204)(`EVENT ADDED \n`));
    }
    if(decision===chalk.rgb(255,238,153)("QUIT")) break
    if(decision===chalk.rgb(255,238,153)("VIEW EVENTS")) console.log(events)
    if(decision===chalk.rgb(255,238,153)("DELETE EVENTS")){
        let del = await inquirer.prompt({
          name:"delete",
          type:"list",
          message: chalk.rgb(127,255,107)("SELECT :"),
          choices: eventsName
        })
        for(let i=0;i<eventsName.length;i++){
          if(eventsName[i]===del.delete){
            events.splice(i,1)
            eventsName.splice(i,1)
            console.log(chalk.blue("EVENT DELETED CLICK VIEW EVENTS TO VIEW"))
            
          }
        }
      }
  }

}else{
  /* .................................................................................................... */

  let answer = await inquirer.prompt ({
    name:'a',
    type:"list",
    message:chalk.yellow("SELECT"),
    choices:[chalk.rgb(128,255,170)(`LOG IN`),chalk.rgb(128,255,170)(`SIGN UP`)]
  })
  let user
  userManager.registerUser(`o`,'0')

  if(answer.a===chalk.rgb(128,255,170)(`LOG IN`)){
    let askForPersonalInfo = await inquirer.prompt([{
    name:"email",
    type:"input",
    message: chalk.rgb(175,0,42)("EMAIL :")
  },{
    name:"password",
    type:"password",
    message: chalk.rgb(175,0,42)("PASSWORD")
  }]);
  let oldUser =   userManager.loginUser(askForPersonalInfo.email,askForPersonalInfo.password)
  user = oldUser
  console.log(user);
  
  }else{
  let askForPersonalInfo = await inquirer.prompt([{
    name:"email",
    type:"input",
    message: chalk.rgb(175,0,42)("EMAIL :")
  },{
    name:"password",
    type:"password",
    message: chalk.rgb(175,0,42)("PASSWORD")
  }]);

  let newUser = userManager.registerUser(askForPersonalInfo.email,askForPersonalInfo.password);
  user = newUser
  console.log(user);
  }
  while(true){
  let browse = await inquirer.prompt({
    name:"options",
    type:"list",
    message: chalk.rgb(127,255,107)("SELECT :"),
    choices: optionsForUser
  })
  
  const decision =browse.options

//view profile 

if(decision===chalk.rgb(255,238,153)("VIEW TICKETS")) console.log(tickets)

  if(decision===chalk.rgb(255,238,153)("VIEW PROFILE")) console.log(user);

  //browse events

  if(decision===chalk.rgb(255,238,153)("VIEW PURCHASE HISTORY")) console.log(purchaseHistory);
  
  if(decision===chalk.rgb(255,238,153)("BROWSE EVENTS")){

    let browseEvents = await inquirer.prompt({
      type:"list",
      name: "allEvents",
    message:chalk.rgb(25,64,255)("SELECT"),
    choices: eventsName
    })
     for(let i of events){
      if(i.eventname===browseEvents.allEvents){
      console.log(i);
    
    let buy = await inquirer.prompt({
      type:"list",
      name:"ticket",
      message: chalk.rgb(0,10,170)("SELECT :"),
      choices:[chalk.rgb(23,255,18)(`BUY`),chalk.rgb(25,255,18)(`CANCEL`)]
    })
    if(buy.ticket===chalk.rgb(23,255,18)(`BUY`)){
      if(bankAccountIsMade===false){
        let choseBank = await inquirer.prompt([{
          type:"list",
          name:"bankName",
          message:chalk.rgb(0,51,77)("AVAILABLE BANKS  :"),
          choices:["HABIB BANK LIMITED (HBL)","MEEZAN BANK","ALLIED BANK","UNITED BANK","BANK ALFALAH"]
        },{
          type:"number",
          name:"number",
          message:chalk.rgb(0,51,77)("BANK NUMBER  :")
        },{
          type:"input",
          name:"branchCode",
          message:chalk.rgb(0,51,77)("BRANCH CODE  :")
        },{
          type:"input",
          name:"bicCode",
          message:chalk.rgb(0,51,77)("BIC CODE  :")
        },{
          type:"input",
          name:"billingAddress",
          message:chalk.rgb(0,51,77)(" BILLING ADDRESS  :")
        }
      ])
      let genAmount =Math.floor( Math.random()*10000)
      let bankAcount= new Bank(choseBank.number,choseBank.bankName,choseBank.branchCode,choseBank.bicCode,choseBank.billingAddress,genAmount)
        console.log(bankAcount);
        bankAccountIsMade = true
        bankAccounts.push(bankAcount)
    }
   bankAccounts[0].amount-=i.price
   let action = `TICKET TO ${i.eventname}`
   let action1 = `YOU BOUGHT A ${action} FOR ${i.price} `
  console.log(action1);
  purchaseHistory.push(action1)
  tickets.push(action)
  user.increaseTicket()
    }}
      continue
     }}
   if(decision===chalk.rgb(255,238,153)("QUIT"))  break
   }
}

},1000)