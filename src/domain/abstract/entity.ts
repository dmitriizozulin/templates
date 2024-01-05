export abstract class IEntity {
    public abstract get id(): string;
    public abstract toDto(): object;
    public abstract validate(): boolean;
}