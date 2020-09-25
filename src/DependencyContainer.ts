import "reflect-metadata";
import { DependencyContext, DependencyInstance, DependencyType, PropertySettings } from "./Common"

export const methodArgumentTypeNameKey = "__argumentTypeName_index";

export class DependencyContainer {
    private static _instance: DependencyContainer = undefined;

    private _dependencies: Array<DependencyContext> = [];
    private _singletonInstamces: Array<DependencyInstance> = [];

    public static get instance(): DependencyContainer {
        if (!this._instance)
        {
            this._instance = new DependencyContainer();
        }
        
        return this._instance;
    };

    public addTransient(
        dependency: string | Function,
        implementation: Function,
        name: string): void {
        
        this.addInternal(dependency, implementation, name, DependencyType.Transient);
    }

    public addScoped(
        dependency: string | Function,
        implementation: Function,
        name: string): void {
        
        this.addInternal(dependency, implementation, name, DependencyType.Scoped);
    }

    public addSingleton(
        dependency: string | Function,
        implementation: Function,
        name: string): void {
        
        this.addInternal(dependency, implementation, name, DependencyType.Singleton);
    }

    public getDependency(predicate: (item: DependencyContext) => boolean): Array<DependencyContext> {
        return this._dependencies.filter(predicate);
    }

    public tryGetSingletonInstance(context: DependencyContext): any {
        var instance = this._singletonInstamces.find((item: DependencyInstance) => item.context === context);
        return instance?.instance;
    }

    public addSingletonInstance(context: DependencyContext, instance: any): void {
        this._singletonInstamces.push(new DependencyInstance(context, instance));
    }

    private addInternal(
        dependency: string | Function,
        implementation: Function,
        name: string,
        type: DependencyType): void {

        let constructorProperties = this.getConstructorProperties(implementation);
        let dependencyContext = new DependencyContext(name, dependency, implementation, constructorProperties, type);
        this._dependencies.push(dependencyContext);
    }

    private getConstructorProperties(implementation: Function): Array<PropertySettings> {
        let parameterTypes: Array<any> = Reflect.getMetadata("design:paramtypes", implementation);
        if (parameterTypes)
        {
            return parameterTypes.map((value: Function, index: number) => {
                let typeName = implementation[methodArgumentTypeNameKey + index];
                return new PropertySettings(typeName ?? value, value.name == Array.name);
            });
        }

        return [];
    }
}