import { orderBy } from "lodash";
import { Repository, type Entity } from "./repository";

export class LocalStorageRepository<E extends Entity, I extends string = E['id']> extends Repository<E, I> {
    private readonly storage: Storage;
    private readonly store = new Map<I, E>();

    constructor(repositoryKey: string, restorer: (model: any) => E) {
        super(repositoryKey, restorer);

        this.storage = window.localStorage

        this.load()
    }
    

    public async all(): Promise<E[]> {
        const enities = [...this.store.values()];
        return orderBy(enities, 'createdAt');
    }

    public async get(entityId: I): Promise<E> {
        return this.store.get(entityId)!;
    }

    public async save(entity: E | E[]): Promise<void> {
        const entities = new Array<E>().concat(entity)
        
        for (const entity of entities) {
            this.store.set(entity.id as I, entity)
        }

        this.upload();
    }

    public async delete(entityId: I | I[]): Promise<void> {
        const ids = new Array<I>().concat(entityId);

        for (const id of ids) {
            this.store.delete(id)
        }

        this.upload();
    }

    public getRawData(): string {
        const data = this.storage.getItem(this.repositoryKey);
        return data || '';
    }

    public getRawPayload(): string {
        const payload: Record<string, object> = {};

        [...this.store.values()].forEach((value) => {
            payload[value.id] = value.toDto();
        })

        return JSON.stringify(payload);
    }

    public loadRaw(data: string): void {
        if (!data) return;

        const parsed = JSON.parse(data);

        Object.entries(parsed).forEach(([key, value]) => {
            this.store.set(key as I, this.restorer(value as object));
        });
        
        this.upload();
    }

    private load(): void {
        if (this.store.size !== 0) return;

        const data = this.getRawData();

        this.loadRaw(data)
    }

    private upload(): void {
        this.storage.setItem(this.repositoryKey, this.getRawPayload());
        this.notify();
    }
}