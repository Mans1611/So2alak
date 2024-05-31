
import { Router } from "express";
import { Lists } from "../Controllers/Lists.js";

const lists = Router();
const list = new Lists()


// check auth -> then checkcache.
lists.get('/allLists/:student_id',list.getAllLists)
lists.get('/:list_id',list.getSpesificList)
lists.post('/createlist',list.createList)
lists.delete('/deleteList/:list_id',list.deleteList)

export default lists;