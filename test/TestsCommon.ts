import { SingletonDependency, TransientDependency, ScopedDependency, NameOfType } from "../src/DIDecorators";

@TransientDependency()
export class SelfTransientDependencyClass {
    public get prop(): string { return SelfTransientDependencyClass.name; };
}

export abstract class IFirstTransientDependencyClass { abstract prop: string; }
@TransientDependency({ dependency: IFirstTransientDependencyClass })
export class FirstTransientDependencyClass extends IFirstTransientDependencyClass {
    public get prop(): string { return FirstTransientDependencyClass.name; };
}

export interface ISecondTransientDependencyClass { prop: string; }
@TransientDependency({ dependency: "ISecondTransientDependencyClass" })
export class SecondTransientDependencyClass implements ISecondTransientDependencyClass {
    public get prop(): string { return SecondTransientDependencyClass.name; };
}

@SingletonDependency()
export class SelfSingletonDependencyClass {
    public get prop(): string { return SelfSingletonDependencyClass.name; };
}

export abstract class IFirstSingletonDependencyClass { abstract prop: string; }
@SingletonDependency({ dependency: IFirstSingletonDependencyClass })
export class FirstSingletonDependencyClass extends IFirstSingletonDependencyClass {
    public get prop(): string { return FirstSingletonDependencyClass.name; };
}

export interface ISecondSingletonDependencyClass { prop: string; }
@SingletonDependency({ dependency: "ISecondSingletonDependencyClass" })
export class SecondSingletonDependencyClass implements ISecondSingletonDependencyClass {
    public get prop(): string { return SecondSingletonDependencyClass.name; };
}

@ScopedDependency()
export class SelfScopedDependencyClass {
    public get prop(): string { return SelfScopedDependencyClass.name; };
}

export abstract class IFirstScopedDependencyClass { abstract prop: string; }
@ScopedDependency({ dependency: IFirstScopedDependencyClass })
export class FirstScopedDependencyClass extends IFirstScopedDependencyClass {
    public get prop(): string { return FirstScopedDependencyClass.name; };
}

export interface ISecondScopedDependencyClass { prop: string; }
@ScopedDependency({ dependency: "ISecondScopedDependencyClass" })
export class SecondScopedDependencyClass implements ISecondScopedDependencyClass {
    public get prop(): string { return SecondScopedDependencyClass.name; };
}

export abstract class IMultipleRegistrationDependency { abstract prop: string }
@TransientDependency({ dependency: IMultipleRegistrationDependency })
export class FirstMultipleRegistrationDependencyClass extends IMultipleRegistrationDependency {
    public get prop(): string { return FirstMultipleRegistrationDependencyClass.name; }
}
@TransientDependency({ dependency: IMultipleRegistrationDependency })
export class SecondMultipleRegistrationDependencyClass extends IMultipleRegistrationDependency {
    public get prop(): string { return SecondMultipleRegistrationDependencyClass.name; }
}
@TransientDependency({ dependency: IMultipleRegistrationDependency })
export class ThirdMultipleRegistrationDependencyClass extends IMultipleRegistrationDependency {
    public get prop(): string { return ThirdMultipleRegistrationDependencyClass.name; }
}

export interface IInterfaceMultipleRegistrationDependency { prop: string }
@TransientDependency({ dependency: "IInterfaceMultipleRegistrationDependency" })
export class FirstInterfaceMultipleRegistrationDependencyClass implements IInterfaceMultipleRegistrationDependency {
    public get prop(): string { return FirstInterfaceMultipleRegistrationDependencyClass.name; }
}
@TransientDependency({ dependency: "IInterfaceMultipleRegistrationDependency" })
export class SecondInterfaceMultipleRegistrationDependencyClass implements IInterfaceMultipleRegistrationDependency {
    public get prop(): string { return SecondInterfaceMultipleRegistrationDependencyClass.name; }
}
@TransientDependency({ dependency: "IInterfaceMultipleRegistrationDependency" })
export class ThirdInterfaceMultipleRegistrationDependencyClass implements IInterfaceMultipleRegistrationDependency {
    public get prop(): string { return ThirdInterfaceMultipleRegistrationDependencyClass.name; }
}

@TransientDependency()
export class ClassWithDependencies {
    constructor (
        public selfTransientDependencyClass: SelfTransientDependencyClass,
        public firstSingletonDependencyClass: IFirstSingletonDependencyClass,
        @NameOfType("ISecondScopedDependencyClass") public secondScopedDependencyClass: ISecondScopedDependencyClass,
        @NameOfType(IMultipleRegistrationDependency) public multipleRegistrationDependency: IMultipleRegistrationDependency[],
        @NameOfType("IInterfaceMultipleRegistrationDependency") public interfaceMultipleRegistrationDependency: IInterfaceMultipleRegistrationDependency[],) { }

    public get prop(): string { return ClassWithDependencies.name; }
}