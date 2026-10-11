import { Router } from "express";
import * as c from "../controllers/category.js";
const r = Router();
r.get("/", c.list).post("/", c.create);
r.get("/:id", c.get).put("/:id", c.update).delete("/:id", c.remove);
export default r;
