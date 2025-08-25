// src/services/AuthService.js
import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { db } from "./firebase.js";
import { onValue, ref, set } from "firebase/database";


class AuthService {
    //which user is here
    client;
    // Create a new user
    async createUser({ email, password, userName }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: userName
            });

            console.log("Account created ::", userCredential.user.displayName);
            this.client = userCredential.user;
            return userCredential.user;
        } catch (error) {
            console.error("Create account error ::", error.message);
            throw error; // let caller handle it
        }
    }

    // Login existing user
    async login({ email, password }) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Logged in ::", userCredential.user.displayName);
            return userCredential.user;
        } catch (error) {
            console.error("Login error ::", error.message);
            throw error;
        }
    }

    //logout
    async logout() {
        try {
            await signOut(auth);
            console.log("The user has logged out...");
        } catch (error) {
            console.error(":: Logout error ::")
            throw error;
        }
    }

    async addNoteToDatabase(note) {
        try {
            await set(ref(db, "users/" + note.owner + "/notes/" + note.id), note);
        } catch (error) {
            console.error(":: Database error ::")
            throw error;
        }
    }

    async readNotes(callback) {
        const user = auth.currentUser;
        if (!user) return;

        const noteRef = ref(db, "users/" + user.uid + "/notes");

        onValue(noteRef, (snap) => {
            const data = snap.val();
            if (data) {
                const notes = Object.entries(data).map(([id, note]) => ({
                    id,
                    ...note
                }));
                callback(notes);
            } else {
                callback([]); // empty list
            }
        });
    }





}

const authService = new AuthService();
export default authService;
