import { DependencyProvider } from "../src/DependencyProvider";
import { expect } from "chai";
import { SelfSingletonDependencyClass, IFirstSingletonDependencyClass, ISecondSingletonDependencyClass } from "./TestsCommon";

describe("SingletonDependencyRegistrationTests", () => {
    it("Should resolve self singleton dependency", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve(SelfSingletonDependencyClass) as SelfSingletonDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should resolve extended singleton dependency", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve(IFirstSingletonDependencyClass) as IFirstSingletonDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should resolve singleton dependency as interface", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve("ISecondSingletonDependencyClass") as ISecondSingletonDependencyClass;
        expect(result.prop).not.undefined;     
    });
    it("Should use single instance of singleton dependency", () => {
        let dependencyProvider = new DependencyProvider();
        let result1 = dependencyProvider.resolve(IFirstSingletonDependencyClass) as IFirstSingletonDependencyClass;

        dependencyProvider = new DependencyProvider();
        let result2 = dependencyProvider.resolve(IFirstSingletonDependencyClass) as IFirstSingletonDependencyClass;
        expect(result1).be.equal(result2);
    });
});