import conf from "../conf/conf.js";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  //!<--Constructor-->
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //!_1.<--Create Post-->
  async createDocument({
    title,
    content,
    slug,
    featuredImage,
    status,
    userID,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: Create Post :: Error ", error);
    }
  }

  //!_2.<--Update Post-->
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: Update Post :: Error ", error);
    }
  }

  //!_3.<--Delete Post-->
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: Delete Post :: Error", error);
      return false;
    }
  }

  //!_4.<--Get Post-->
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: Get Post :: Error ", error);
    }
  }

  //!_5.<--Get Post-->
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite servie :: Get posts :: Error ", error);
    }
  }

  //.File Upload Service

  //!_6.<--Upload File-->
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file //file will be in the form of blob
      );
    } catch (error) {
      console.log("Appwrite service :: Create File :: Error ", error);
      return false;
    }
  }

  //!_7.<--Delete File-->
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: Delete File :: Error ", error);
      return false;
    }
  }

  //!_8.<--File Preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();

export default service;
