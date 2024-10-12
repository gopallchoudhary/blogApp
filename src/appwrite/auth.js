import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService { //createAccount, getCurrentUser, login, logout
  client = new Client();
  account;

  //!<--Constructor-->
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  //!<--CreateAccount-->
  async createAccount({ email, password, name }) {
    try {
      const userAccout = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccout) {
        //call another method
        return this.login(email, password);
      } else {
        return userAccout;
      }
    } catch (error) {
      throw error;
    }
  }

  //!<--Login-->
  async login(email, password) {
    try {
      await this.account.createEmailPasswordSession({ email, password });
    } catch (error) {}
  }

  //!<--Get Current User-->
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Error :: User not found :: Error ", error);
    }
    return null;
  }

  //!<--Logout-->
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
