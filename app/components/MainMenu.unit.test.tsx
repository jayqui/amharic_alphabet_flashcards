import renderer from "react-test-renderer"
import MainMenu from "./MainMenu"

describe("MainMenu", () => {
    it("basically renders", () => {
        expect(renderer.create(<MainMenu navigate={() => {}}/>)).toBeTruthy();
    });
});
