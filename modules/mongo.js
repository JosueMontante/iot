const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = 'mongodb://Josue:1234@ds117250.mlab.com:17250/iotestacionamiento';

module.exports = {
  /**
   * Find results in a collection given a match JSON and extra JSON
   * @param {string} collection Collection to check
   * @param {JSON} json Match Json for mongo
   * @param {JSON} extra  Extra JSON for mongo
   * @return {JSON}
   */
  find: async function(collection, json, extra) {
    try {
      let client = await MongoClient.connect(url);
      let db = await client.db();

      let results = await db.collection(collection).find(json, extra).toArray();
      await client.close();
      return results;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Find results in a collection given a match JSON and extra JSON
   * @param {string} collection Collection to check
   * @param {JSON} json Match Json for mongo
   * @param {JSON} extra  Extra JSON for mongo
   * @return {JSON}
   */
  findOne: async function(collection, json, extra) {
    try {
      let client = await MongoClient.connect(url);
      let db = await client.db();

      let results = await db.collection(collection).findOne(json, extra);
      await client.close();
      return results;
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * Remove results in a collection given a match JSON
   * @param {string} collection Collection to check
   * @param {JSON} json Match Json for mongo
   * @return {JSON}
   */
  delete: async function(collection, json) {
    try {
      let client = await MongoClient.connect(url);
      let db = await client.db();

      let result = await db.collection(collection).remove(json);
      await client.close();
      return result;
    } catch (e) {
      console.log(e);
    }
  },
  /**
   * Insert one item in a given collection
   * @param {string} collection Collection to check
   * @param {JSON} json JSON element to insert
   * @return {JSON}
   */
  insertOne: async function(collection, json) {
    let client = await MongoClient.connect(url);
    let db = await client.db();

    try {
        let result = await db.collection(collection).insertOne(json);
        await client.close();
        return result;
    } catch (err) {
        console.log(err);
        if (err.code==11000) {
            json._id = new ObjectId();
            return await this.insertOne(collection, json);
        }
    }
  },
    /**
   * Replace one item in a given collection
   * @param {string} collection Collection to check
   * @param {string} id id to update
   * @param {JSON} update Update JSON
   * @return {JSON}
   */
  replaceOneId: async function(collection, id, update) {
    let client = await MongoClient.connect(url);
    let db = await client.db();

    try {
        let result = await db.collection(collection).replaceOne({'_id': new ObjectId(id)}, update);
        await client.close();
        return result;
    } catch (e) {
      console.log(e);
    }
  },
};
