import { User } from "./construct.js";
import chalkAnimation from 'chalk-animation';
export class UserManager {
    public users: User[] = []; 
    
    registerUser(email: string, password: string){
        for (let user of this.users) {
            if (user.email === email) {
                 console.log("Username already exists.")
                  return process.exit(0)
            }
        }

        let newUser = new User(email, password);
        this.users.push(newUser);
        console.log(`User registered successfully.`);
        return newUser;
    }

    loginUser(email: string, password: string){
        for (let user of this.users) {
            if (user.email === email && user.password === password) {
                console.log(`User logged in successfully.`);
                return user;
            }
        }
        console.log("Invalid username or password.");
        return process.exit(0)
    }
}


