import { DependencyProvider } from "../src/DependencyProvider";
import { expect } from "chai";
import { SelfScopedDependencyClass, IFirstScopedDependencyClass, ISecondScopedDependencyClass } from "./TestsCommon";

describe("SingletonDependencyRegistrationTests", () => {
    it("Should resolve self scoped dependency", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve(SelfScopedDependencyClass) as SelfScopedDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should resolve extended scoped dependency", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve(IFirstScopedDependencyClass) as IFirstScopedDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should resolve scoped dependency as interface", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve("ISecondScopedDependencyClass") as ISecondScopedDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should use single instance of scoped dependency when the same context", () => {
        let dependencyProvider = new DependencyProvider();

        let result1 = dependencyProvider.resolve(IFirstScopedDependencyClass) as IFirstScopedDependencyClass;
        let result2 = dependencyProvider.resolve(IFirstScopedDependencyClass) as IFirstScopedDependencyClass;

        expect(result1.prop).not.undefined; 
        expect(result2.prop).not.undefined; 
        expect(result1).be.equal(result2);
    });
    it("Should create new instance of scoped dependency when the different contexts", () => {
        let dependencyProvider = new DependencyProvider();
        let result1 = dependencyProvider.resolve(IFirstScopedDependencyClass) as IFirstScopedDependencyClass;

        dependencyProvider = new DependencyProvider();
        let result2 = dependencyProvider.resolve(IFirstScopedDependencyClass) as IFirstScopedDependencyClass;

        expect(result1.prop).not.undefined; 
        expect(result2.prop).not.undefined; 
        expect(result1).be.not.equal(result2);
    });
});