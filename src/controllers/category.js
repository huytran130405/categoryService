import * as Category from "../models/category.js";

export const list = async (req, res) => res.json(await Category.all());

export const get = async (req, res) => {
  const c = await Category.byId(req.params.id);
  c ? res.json(c) : res.status(404).json({ error: "Not found" });
};

export const create = async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ error: "name is required" });
  res.status(201).json(await Category.create(req.body));
};

export const update = async (req, res) => {
  if (!req.body.name)
    return res.status(400).json({ error: "name is required" });
  const c = await Category.update(req.params.id, req.body);
  c ? res.json(c) : res.status(404).json({ error: "Not found" });
};

export const remove = async (req, res) =>
  (await Category.remove(req.params.id))
    ? res.status(204).end()
    : res.status(404).json({ error: "Not found" });
