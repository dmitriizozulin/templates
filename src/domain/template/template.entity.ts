
import { IEntity } from '@domain/abstract/entity';

import type { ToConstructorParams, ToRestorationParams } from '@utils/entityUtils';

import { createEntity } from "@utils/createEntity";
import { generateId } from '@utils/generateId';
import { restoreEntity } from "@utils/restoreEntity";

export interface ITemplate extends IEntity {
    id: string;
    type: string;
    name: string;
    value: string;
    usedCount: number;
    createdAt: Date;
    use(): void;
}

type ConstructorParams = ToConstructorParams<ITemplate, 'id' | 'usedCount' | 'createdAt'>;
type RestoreParams = ToRestorationParams<ConstructorParams>;

class Template extends IEntity implements ITemplate {
    #id: string;
    #type: string;
    #name: string;
    #value: string;
    #usedCount: number;
    #createdAt: Date;

    public static new(params: ConstructorParams): Template {
        return new Template(params);
    }

    public static restore(params: RestoreParams): Template {
        return new Template({
            ...params,
            createdAt: params.createdAt ? new Date(params.createdAt) : undefined,
        });
    }

    private constructor(params: ConstructorParams) {
        super()
        this.#id = params.id ?? generateId();
        this.#type = params.type;
        this.#name = params.name;
        this.#value = params.value;
        this.#usedCount = params.usedCount ?? 0;
        this.#createdAt = params.createdAt ?? new Date();
    }

    public get id(): string {
        return this.#id;
    }

    public get type(): string {
        return this.#type;
    }

    public get name(): string {
        return this.#name;
    }

    public get value(): string {
        return this.#value;
    }

    public get usedCount(): number {
        return this.#usedCount;
    }

    public get createdAt(): Date {
        return this.#createdAt;
    }

    public use(): void {
        this.#usedCount += 1;
    }

    public toDto(): object {
        return {
            id: this.id,
            type: this.type,
            name: this.name,
            value: this.value,
            usedCount: this.usedCount,
            createdAt: this.createdAt.toISOString(),
        }
    }
}

export const createTemplate = (params: ConstructorParams) => createEntity(Template, params);
export const restoreTemplate = (params: RestoreParams) => restoreEntity(Template, params);