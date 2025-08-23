// src/services/AuthService.js
import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

class AuthService {
    //which user is here
    client;
    // Create a new user
    async createUser({ email, password }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account created ::", userCredential.user);
            return userCredential.user; // return user object
        } catch (error) {
            console.error("Create account error ::", error.message);
            throw error; // let caller handle it
        }
    }

    // Login existing user
    async login({ email, password }) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in ::", userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("Login error ::", error.message);
            throw error;
        }
    }

    //logout
    async logout(){
        try{
           await signOut(auth);
            console.log("The user has logged out...");
        } catch(error){
            console.error(":: Logout error ::")
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService;
