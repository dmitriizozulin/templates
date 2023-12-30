type Identifible<I extends any> = { id: I };

export const idsOf = <I extends any>(values: Identifible<I>[]) => values.map(it => it.id);