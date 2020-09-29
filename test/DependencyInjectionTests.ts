import { DependencyProvider } from "../src/DependencyProvider";
import { expect } from "chai";
import {  ClassWithDependencies,
    FirstSingletonDependencyClass, SelfTransientDependencyClass, SecondScopedDependencyClass,
    FirstMultipleRegistrationDependencyClass, SecondMultipleRegistrationDependencyClass, ThirdMultipleRegistrationDependencyClass,
    FirstInterfaceMultipleRegistrationDependencyClass, SecondInterfaceMultipleRegistrationDependencyClass, ThirdInterfaceMultipleRegistrationDependencyClass
} from "./TestsCommon";

describe("MultipleDependenciesRegistrationTests", () => {
    it("Should resolve multiple dependencies", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolve(ClassWithDependencies) as ClassWithDependencies;
        expect(result.prop).be.equal(ClassWithDependencies.name);

        expect(result.firstSingletonDependencyClass.prop).be.equal(FirstSingletonDependencyClass.name);
        expect(result.secondScopedDependencyClass.prop).be.equal(SecondScopedDependencyClass.name);
        expect(result.selfTransientDependencyClass.prop).be.equal(SelfTransientDependencyClass.name);

        expect(result.multipleRegistrationDependency.length).be.equal(3);
        let resultTypes = result.multipleRegistrationDependency.map(x => x.prop);
        expect(resultTypes.includes(FirstMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(SecondMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(ThirdMultipleRegistrationDependencyClass.name));

        expect(result.interfaceMultipleRegistrationDependency.length).be.equal(3);
        resultTypes = result.interfaceMultipleRegistrationDependency.map(x => x.prop);
        expect(resultTypes.includes(FirstInterfaceMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(SecondInterfaceMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(ThirdInterfaceMultipleRegistrationDependencyClass.name));
    });
});