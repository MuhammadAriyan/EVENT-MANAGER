export class Bank{
    constructor(
        public bankNum:number,
        public bankName:string= "HABIB BANK LIMITED (HBL)"||"MEEZAN BANK"||"ALLIED BANK"||"UNITED BANK"||"BANK ALFALAH",
        public branchCode:string,
        public bicCode:string,
        public billingAddress:string,
        public amount:number
    ){
        this.bankName=bankName,
        this.bankNum=bankNum,
        this.branchCode=branchCode,
        this.bicCode=bicCode,
        this.billingAddress=billingAddress,
        this.amount=amount
    }
} 