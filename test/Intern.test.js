const Intern = require("../lib/Intern");

describe("Intern", () => {
    it("Can instantiate Intern instance", () => {
        const e = new Intern();
        expect(typeof(e)).toBe("object");
    });

    it("Can set name via constructor arguments", () => {
        const name = "Alice";
        const e = new Intern(name);
        expect(e.name).toBe(name);
    });

    it("Can set id via constructor argument", () => {
        const testValue = 100;
        const e = new Intern("Foo", testValue);
        expect(e.id).toBe(testValue);
    });

    it("Can set email via constructor argument", () => {
        const testValue = "test@test.com";
        const e = new Intern("Foo", 1, testValue);
        expect(e.email).toBe(testValue);
    });

    describe("getName", () => {
        it("Can get name via getName()", () => {
            const testValue = "Alice";
            const e = new Intern(testValue);
            expect(e.getName()).toBe(testValue);
        });
    });
        
    describe("getId", () => {
        it("Can get id via getId()", () => {
            const testValue = 100;
            const e = new Intern("Foo", testValue);
            expect(e.getId()).toBe(testValue);
        });
    });
        
    describe("getEmail", () => {
        it("Can get email via getEmail()", () => {
            const testValue = "test@test.com";
            const e = new Intern("Foo", 1, testValue);
            expect(e.getEmail()).toBe(testValue);
        });
    });

    describe("getSchool", ()=> {
        it('should return the school account of the user', ()=>{
            const testValue = "testUniversity";
            const e = new Intern("Foo", 1, 'test@test', testValue)
            expect(e.getSchool()).toBe(testValue)
        })
    });
        
    describe("getRole", () => {
        it("getRole() should return \"Intern\"", () => {
            const testValue = "Intern";
            const e = new Intern("Alice", 1, "test@test.com", "testUniversity");
            expect(e.getRole()).toBe(testValue);
        });
    });
    
});