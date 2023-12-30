export abstract class IEntity {
    public abstract get id(): string;
    public abstract toDto(): object;
}