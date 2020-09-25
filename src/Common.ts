export class DependencyContext {
    constructor(
        public name: string,
        public dependency: string | Function,
        public implementation: Function,
        public constructorProperties: Array<PropertySettings>,
        public type: DependencyType) { }
}

export class PropertySettings {
    constructor(
        public dependency: string | Function,
        public isArray: boolean) { }
}

export class DependencyInstance {
    constructor(
        public context: DependencyContext,
        public instance: any) {}
}

export enum DependencyType {
    Transient,
    Scoped,
    Singleton
}