import renderer from "react-test-renderer"
import MainMenu from "./MainMenu"
import { Button } from "react-native-paper"

describe("MainMenu", () => {
    it("includes two buttons", () => {
        const mockNavigate = () => {};
        const testInstance = renderer.create(<MainMenu navigate={mockNavigate}/>).root;
        expect(testInstance.findAllByType(Button).length).toBe(2);
    });
});
