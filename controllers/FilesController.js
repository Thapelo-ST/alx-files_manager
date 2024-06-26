import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class FilesController {
  static async postUpload(req, res) {
    // finding user by token
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await dbClient.find_user(userId);
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    // uploading file in db and in disk

    const { name, type, parentId = 0, isPublic = false, data } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }

    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }

    if (!data && type !== 'folder') {
      return res.status(400).json({ error: 'Missing data' });
    }

    if (parentId) {
      const parentFile = await dbClient.find_file(parentId);
      if (!parentFile) {
        return res.status(400).json({ error: 'Parent not found' });
      }
      if (parentFile.type !== 'folder') {
        return res.status(400).json({ error: 'Parent is not a folder' });
      }
    }

    if (type === 'folder') {
      const newFile = await dbClient.create_file({ userId, name, type, parentId, isPublic });
      return res.status(201).send(newFile);
    }

    const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const filename = uuidv4();
    const localPath = path.join(folderPath, filename);
    try {
      fs.writeFileSync(localPath, data, 'base64');
    } catch (err) {
      return res.status(400).send({ error: 'Invalid data' });
    }

    const newFile = await dbClient.create_file({ userId, name, type, parentId, isPublic, localPath });
    let responseFile = {
      _id: newFile._id,
      userId: newFile.userId,
      name: newFile.name,
      type: newFile.type,
      parentId: newFile.parentId,
      isPublic: newFile.isPublic
    };
    return res.status(201).send(responseFile);
  }

  static async getShow(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await dbClient.find_user(userId);
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const fileId = req.params.id;
    const file = await dbClient.find_file({ _id: fileId, userId });
    if (!file) {
      return res.status(404).send({ error: 'Not found' });
    }

    return res.status(200).send(file);
  }

  static async authUser(token){
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await dbClient.find_user(userId);
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    return user;
  }

  static async getIndex(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const user = await dbClient.find_user(userId);
    if (!user) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const parentId = req.query.parentId || 0;
    const page = req.query.page || 0;
    const files = await dbClient.find_files({ parentId, userId }, page);

    return res.status(200).send(files);
  }

  static async putPublish(req, res) {
    const token = req.header('X-Token');
    const user = await this.authUser(token);

    if (!user){
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const fieldId = req.params.id;
    const file = await dbClient.find_file({ _id: fieldId, userId: user._id });
    if (!file){
      return res.status(404).send({ error: 'Not found' });
    }

    file.isPublic = true;
    await file.save();
    return res.status(200).send(file);
  }

  static async putUnpublish(req, res) {
        const token = req.header('X-Token');
    const user = await this.authUser(token);

    if (!user){
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const fieldId = req.params.id;
    const file = await dbClient.find_file({ _id: fieldId, userId: user._id });
    if (!file){
      return res.status(404).send({ error: 'Not found' });
    }

    file.isPublic = false;
    await file.save();
    return res.status(200).send(file);
  }
}

module.exports = FilesController;
