import { DependencyContainer, methodArgumentTypeNameKey } from "./DependencyContainer";

export function TransientDependency(properties?: {dependency?: string | Function, name?: string}): Function {
    return (target: any) => {   
        DependencyContainer.instance.addTransient(
            properties?.dependency ? properties.dependency : target,
            target,
            properties?.name);

        return target;
    };
}

export function SingletonDependency(properties?: {dependency?: string | Function, name?: string}): Function {
    return (target: any) => {   
        DependencyContainer.instance.addSingleton(
            properties?.dependency ? properties.dependency : target,
            target,
            properties?.name);

        return target;
    };
}

export function ScopedDependency(properties?: {dependency?: string | Function, name?: string}): Function {
    return (target: any) => {   
        DependencyContainer.instance.addScoped(
            properties?.dependency ? properties.dependency : target,
            target,
            properties?.name);

        return target;
    };
}

export function NameOfType(typeName: string | Function): Function {
    return (target: any, key : string, index : number) =>{
        target[methodArgumentTypeNameKey + index] = typeName;
    }
}