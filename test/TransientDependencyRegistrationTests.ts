import { DependencyProvider } from "../src/DependencyProvider";
import { expect } from "chai";
import { SelfTransientDependencyClass, IFirstTransientDependencyClass,
    ISecondTransientDependencyClass } from "./TestsCommon";

describe("TransientDependencyRegistrationTests", () => {
    it("Should resolve self transient dependency", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve(SelfTransientDependencyClass) as SelfTransientDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should resolve extended transient dependency", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve(IFirstTransientDependencyClass) as IFirstTransientDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should resolve transient dependency as interface", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve("ISecondTransientDependencyClass") as ISecondTransientDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should create new instance of transient dependency", () => {
        let dependencyProvider = new DependencyProvider();

        let result1 = dependencyProvider.resolve(IFirstTransientDependencyClass) as IFirstTransientDependencyClass;
        let result2 = dependencyProvider.resolve(IFirstTransientDependencyClass) as IFirstTransientDependencyClass;
        expect(result1).be.not.equal(result2);     
    });
});