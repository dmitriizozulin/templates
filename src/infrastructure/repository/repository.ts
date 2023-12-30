export interface Entity {
    id: string;
    createdAt: Date;
    toDto(): object;
}

export type Listener = () => void;
export type Unsubscribe = () => void;

export abstract class IRepository<E extends Entity, I extends string = E['id']> {
    public abstract get(entityId: I): Promise<E>;
    public abstract save(entity: E): Promise<void>;
    public abstract delete(entityId: I): Promise<void>;
}

export abstract class Repository<E extends Entity, I extends string = E['id']> implements IRepository<E, I> {
    protected readonly repositoryKey: string;
    protected readonly restorer: (model: object) => E;
    protected readonly listeners = new Map<Symbol, Listener>()
    
    constructor(repositoryKey: string, restorer: (model: object) => E) {
        this.repositoryKey = repositoryKey;
        this.restorer = restorer;
    }

    public abstract get(entityId: I): Promise<E>;
    public abstract save(entity: E): Promise<void>;
    public abstract delete(entityId: I): Promise<void>;

    public subscribe(listener: Listener): Unsubscribe {
        const key = Symbol();

        this.listeners.set(key, listener);

        return () => this.listeners.delete(key);
    }

    protected notify(): void {
        for (const listener of this.listeners.values()) {
            listener();
        }
    }
}