export class Usuario{

    constructor(
      public id: string,
      public email: string,
      private tokenP: string,
      private tokenExpiration: Date
    ){}
  
    get token(){
      if(!this.tokenExpiration || this.tokenExpiration <= new Date()){
        return null;
      }
      return this.tokenP;
    }
  }
