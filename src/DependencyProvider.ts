import { DependencyContext, DependencyInstance, DependencyType } from "./Common"
import { DependencyContainer } from "./DependencyContainer";

export class DependencyProvider {
    private _scopedInstances: Array<DependencyInstance> = [];

    public resolve(dependency: string | Function, name?: string): any {
        let dependenciesContexts = DependencyContainer.instance.getDependency(item => 
            item.dependency === dependency && (!name || item.name === name));
        if (dependenciesContexts.length === 0) {
            throw `Implementation of '${dependency}' dependency not exists.`;
        } if (dependenciesContexts.length > 1) {
            throw `Dependency ${dependency} has many implementations.`;
        }
        
        let context = dependenciesContexts[0];
        switch (context.type) {
            case DependencyType.Transient:
                return this.buildDependencyInstance(context);
            case DependencyType.Singleton:
                return this.getSingletonInstance(context);
            case DependencyType.Scoped:
                return this.getScopedInstance(context);
        }
    }

    private resolveMany(dependency: string | Function): Array<any> {
        let dependencies = DependencyContainer.instance.getDependency(item => item.dependency === dependency);
        return dependencies.map(item => this.resolve(item.dependency));
    }

    private getSingletonInstance(context: DependencyContext): any {
        let dependencyInstance = DependencyContainer.instance.tryGetSingletonInstance(context);
        if (dependencyInstance) {
            return dependencyInstance;
        }

        dependencyInstance = this.buildDependencyInstance(context);
        DependencyContainer.instance.addSingletonInstance(context, dependencyInstance);

        return dependencyInstance;
    }

    private getScopedInstance(context: DependencyContext) {
        let dependencyInstance = this._scopedInstances.find((item: DependencyInstance) => item.context === context);
        if (dependencyInstance) {
            return dependencyInstance;
        }

        dependencyInstance = this.buildDependencyInstance(context);
        this._scopedInstances.push(new DependencyInstance(context, dependencyInstance));

        return dependencyInstance;
    }

    private buildDependencyInstance(context: DependencyContext) {
        let propertiesInstances = [];
        context.constructorProperties.forEach(item => {
            let propertieInstance = item.isArray ? this.resolveMany(item.dependency) : this.resolve(item.dependency);

            propertiesInstances.push(propertieInstance);
        });

        return this.applyToConstructor(context.implementation, propertiesInstances);
    }

    private applyToConstructor(constructor: Function, argArray: Array<any>): any {
        var args = [null].concat(argArray);
        var factoryFunction = constructor.bind.apply(constructor, args);
        return new factoryFunction();
    }
}