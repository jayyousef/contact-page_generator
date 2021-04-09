const Manager = require("../lib/Manager");

describe("Manager", () => {
    it("Can instantiate Manager instance", () => {
        const e = new Manager();
        expect(typeof(e)).toBe("object");
    });

    it("Can set name via constructor arguments", () => {
        const name = "Alice";
        const e = new Manager(name);
        expect(e.name).toBe(name);
    });

    it("Can set id via constructor argument", () => {
        const testValue = 100;
        const e = new Manager("Foo", testValue);
        expect(e.id).toBe(testValue);
    });

    it("Can set email via constructor argument", () => {
        const testValue = "test@test.com";
        const e = new Manager("Foo", 1, testValue);
        expect(e.email).toBe(testValue);
    });

    describe("getName", () => {
        it("Can get name via getName()", () => {
            const testValue = "Alice";
            const e = new Manager(testValue);
            expect(e.getName()).toBe(testValue);
        });
    });
        
    describe("getId", () => {
        it("Can get id via getId()", () => {
            const testValue = 100;
            const e = new Manager("Foo", testValue);
            expect(e.getId()).toBe(testValue);
        });
    });
        
    describe("getEmail", () => {
        it("Can get email via getEmail()", () => {
            const testValue = "test@test.com";
            const e = new Manager("Foo", 1, testValue);
            expect(e.getEmail()).toBe(testValue);
        });
    });
        
    describe("getOfficeNumber", ()=> {
        it('should return the school account of the user', ()=>{
            const testValue = "1234";
            const e = new Manager("Foo", 1, 'test@test', testValue)
            expect(e.getOfficeNumber()).toBe(testValue)
        })
    });

    describe("getRole", () => {
        it("getRole() should return \"Manager\"", () => {
            const testValue = "Manager";
            const e = new Manager("Alice", 1, "test@test.com", 1234);
            expect(e.getRole()).toBe(testValue);
        });
    });
    
});