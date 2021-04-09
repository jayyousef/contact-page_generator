const Engineer = require("../lib/Engineer");

describe("EngineerEngineer", () => {
    it("Can instantiate Enginner instance", () => {
        const e = new Engineer();
        expect(typeof(e)).toBe("object");
    });

    it("Can set name via constructor arguments", () => {
        const name = "Alice";
        const e = new Engineer(name);
        expect(e.name).toBe(name);
    });

    it("Can set id via constructor argument", () => {
        const testValue = 100;
        const e = new Engineer("Foo", testValue);
        expect(e.id).toBe(testValue);
    });

    it("Can set email via constructor argument", () => {
        const testValue = "test@test.com";
        const e = new Engineer("Foo", 1, testValue);
        expect(e.email).toBe(testValue);
    });

    it("Can set github account name via constructor argument", () => {
        const testValue = "githubName";
        const e = new Engineer("Foo", 1, 'test@test', testValue);
        expect(e.gitHub).toBe(testValue);
    });

    describe("getName", () => {
        it("Can get name via getName()", () => {
            const testValue = "Alice";
            const e = new Engineer(testValue);
            expect(e.getName()).toBe(testValue);
        });
    });
        
    describe("getId", () => {
        it("Can get id via getId()", () => {
            const testValue = 100;
            const e = new Engineer("Foo", testValue);
            expect(e.getId()).toBe(testValue);
        });
    });
        
    describe("getEmail", () => {
        it("Can get email via getEmail()", () => {
            const testValue = "test@test.com";
            const e = new Engineer("Foo", 1, testValue);
            expect(e.getEmail()).toBe(testValue);
        });
    });
        

    describe("getGithub", ()=> {
        it('should return the gitHub account of the user', ()=>{
            const testValue = "gitHub";
            const e = new Engineer("Foo", 1, 'test@test', testValue)
            expect(e.getGithub()).toBe(testValue)
        })
    });

    describe("getRole", () => {
        it("getRole() should return \'Engineer'", () => {
            const testValue = "Engineer";
            const e = new Engineer("Alice", 1, "test@test.com");
            expect(e.getRole()).toBe(testValue);
        });
    });
    

    
});