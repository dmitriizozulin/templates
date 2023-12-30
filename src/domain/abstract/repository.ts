import type { IEntity } from "./entity";

export abstract class IRepository<E extends IEntity, I extends string = E['id']> {
    public abstract get(entityId: I): Promise<E>;
    public abstract update(entityId: I, entity: Partial<E>): Promise<void>;
    public abstract save(entity: E): Promise<void>;
    public abstract delete(entityId: E): Promise<void>;

    public abstract getRawData(): string;
    public abstract getRawPayload(): string;
    public abstract loadRaw(data: string): void;
}