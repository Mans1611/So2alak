import { Router } from "express";
import { Trending } from "../Controllers/Trending.js";


const trending = Router();
const trendingController = new Trending()
trending.get('/trending',trendingController.getTrendingTopic);


export default trending;