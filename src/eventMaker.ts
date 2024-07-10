export class Event {
    constructor(
        public eventname : string,
        public time: string,
        public price:number,
        public description : string
    ){
        this.eventname=eventname,
        this.time=time,
        this.price=price,
        this.description=description
    }
}
