export class User{
    constructor(
        public email:string,
        public password:string,
        public ticket:number=0 ,
    ){
        this.email=email,
        this.password=password,
        this.ticket = ticket
    }
    increaseTicket():number{
        this.ticket++
        return this.ticket
    }
}