import { DependencyProvider } from "../src/DependencyProvider";
import { expect } from "chai";
import { IMultipleRegistrationDependency, IInterfaceMultipleRegistrationDependency,
    FirstMultipleRegistrationDependencyClass, SecondMultipleRegistrationDependencyClass, ThirdMultipleRegistrationDependencyClass,
    FirstInterfaceMultipleRegistrationDependencyClass, SecondInterfaceMultipleRegistrationDependencyClass, ThirdInterfaceMultipleRegistrationDependencyClass
} from "./TestsCommon"

describe("MultipleDependenciesRegistrationTests", () => {
    it("Should resolve multiple dependencies", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolveMany(IMultipleRegistrationDependency) as IMultipleRegistrationDependency[];
        expect(result.length).be.equal(3);
        let resultTypes = result.map(x => x.prop);
        expect(resultTypes.includes(FirstMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(SecondMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(ThirdMultipleRegistrationDependencyClass.name));
    });
    it("Should resolve multiple interface dependencies", () => {
        let dependencyProvider = new DependencyProvider();

        let result = dependencyProvider.resolveMany("IInterfaceMultipleRegistrationDependency") as IInterfaceMultipleRegistrationDependency[];
        expect(result.length).be.equal(3);
        let resultTypes = result.map(x => x.prop);
        expect(resultTypes.includes(FirstInterfaceMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(SecondInterfaceMultipleRegistrationDependencyClass.name));
        expect(resultTypes.includes(ThirdInterfaceMultipleRegistrationDependencyClass.name));
    });
});