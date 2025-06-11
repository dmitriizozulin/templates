import { orderBy, isEmpty } from "lodash";
import { v4 } from "uuid";
class Repository {
  repositoryKey;
  restorer;
  listeners = /* @__PURE__ */ new Map();
  constructor(repositoryKey, restorer) {
    this.repositoryKey = repositoryKey;
    this.restorer = restorer;
  }
  subscribe(listener) {
    const key = Symbol();
    this.listeners.set(key, listener);
    return () => this.listeners.delete(key);
  }
  notify() {
    for (const listener of this.listeners.values()) {
      listener();
    }
  }
}
class LocalStorageRepository extends Repository {
  storage;
  store = /* @__PURE__ */ new Map();
  constructor(repositoryKey, restorer) {
    super(repositoryKey, restorer);
    this.storage = window.localStorage;
    this.load();
  }
  async all() {
    const enities = [...this.store.values()];
    return orderBy(enities, "createdAt");
  }
  async get(entityId) {
    return this.store.get(entityId);
  }
  async save(entity) {
    const entities = new Array().concat(entity);
    for (const entity2 of entities) {
      this.store.set(entity2.id, entity2);
    }
    this.upload();
  }
  async delete(entityId) {
    const ids = new Array().concat(entityId);
    for (const id of ids) {
      this.store.delete(id);
    }
    this.upload();
  }
  getRawData() {
    const data = this.storage.getItem(this.repositoryKey);
    return data || "";
  }
  getRawPayload() {
    const payload = {};
    [...this.store.values()].forEach((value) => {
      payload[value.id] = value.toDto();
    });
    return JSON.stringify(payload);
  }
  loadRaw(data) {
    if (!data) return;
    const parsed = JSON.parse(data);
    Object.entries(parsed).forEach(([key, value]) => {
      this.store.set(key, this.restorer(value));
    });
    this.upload();
  }
  load() {
    if (this.store.size !== 0) return;
    const data = this.getRawData();
    this.loadRaw(data);
  }
  upload() {
    this.storage.setItem(this.repositoryKey, this.getRawPayload());
    this.notify();
  }
}
class IEntity {
}
const createEntity = (ctor, params) => {
  return ctor.new(params);
};
const generateId = () => v4();
const restoreEntity = (ctor, params) => {
  return ctor.restore(params);
};
class Template extends IEntity {
  #id;
  #type;
  #name;
  #value;
  #usedCount;
  #createdAt;
  static new(params) {
    return new Template(params);
  }
  static restore(params) {
    return new Template({
      ...params,
      createdAt: params.createdAt ? new Date(params.createdAt) : void 0
    });
  }
  constructor(params) {
    super();
    this.#id = params.id ?? generateId();
    this.#type = params.type;
    this.#name = params.name;
    this.#value = params.value;
    this.#usedCount = params.usedCount ?? 0;
    this.#createdAt = params.createdAt ?? /* @__PURE__ */ new Date();
  }
  get id() {
    return this.#id;
  }
  get type() {
    return this.#type;
  }
  get name() {
    return this.#name;
  }
  get value() {
    return this.#value;
  }
  get usedCount() {
    return this.#usedCount;
  }
  get createdAt() {
    return this.#createdAt;
  }
  use() {
    this.#usedCount += 1;
  }
  updateName(name) {
    this.#name = name;
  }
  updateType(type) {
    this.#type = type;
  }
  updateValue(value) {
    this.#value = value;
  }
  toDto() {
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      value: this.value,
      usedCount: this.usedCount,
      createdAt: this.createdAt.toISOString()
    };
  }
  validate() {
    return [this.name, this.type, this.value].every((it) => !isEmpty(it));
  }
}
const createTemplate = (params) => createEntity(Template, params);
const restoreTemplate = (params) => restoreEntity(Template, params);
class ITemplateRepository extends LocalStorageRepository {
}
const TemplateRepositorySymbol = Symbol("TemplateRepositoryToken");
const TemplateRepositoryToken = {
  token: TemplateRepositorySymbol
};
const createTemplateRepository = () => new ITemplateRepository("templates", restoreTemplate);
export {
  TemplateRepositoryToken as T,
  createTemplate as a,
  createTemplateRepository as c
};
