import { TransientDependency, NameOfType, SingletonDependency } from "../src/DIDecorators";
import { DependencyProvider } from "../src/DependencyProvider";
import { DependencyContext } from "../src/Common";

interface IMyClass2 {}
abstract class IMyClass3 {
    public abstract get MyValue(): string;
    public abstract set MyValue(value: string);
}

@TransientDependency()
class MyClass1 {
    constructor(
        @NameOfType("IMyClass2") public prop1: IMyClass2[],
        public prop2: IMyClass3) {}

    public MyValue: string = "MyClass1";
}

@TransientDependency({dependency: "IMyClass2"})
class MyClass2 implements IMyClass2 {
    constructor(public prop2: IMyClass3) {}

    public MyValue: string = "MyClass2";
}

@SingletonDependency({dependency: IMyClass3})
class MyClass3 extends IMyClass3{
    private _myValue: string = "old value";

    public get MyValue(): string { return this._myValue; }
    public set MyValue(value: string) { this._myValue = value; }

}

var compositionContext = new DependencyProvider();
var cls1 = compositionContext.resolve(MyClass1) as MyClass1;
var cls3 = compositionContext.resolve(IMyClass3) as IMyClass3;

console.log(cls1.prop2.MyValue);
console.log(cls3.MyValue);

cls3.MyValue = "new value";

console.log(cls1.prop2.MyValue);
console.log(cls3.MyValue);