import CheckboxPrompt from "./checkbox";
import ConfirmPrompt from "./confirm";
import ExpandPrompt from "./expand";
import InputPrompt from "./input";
import ListPrompt from "./list";
import PasswordPrompt from "./password";
import Prompt from "./prompt";

export default class PromptFactory {
	public static createPrompt(question: any, answers: any): Prompt {
		/**
		 * TODO:
		 *   - folder
		 */
		switch (question.type || "input") {
			case "string":
			case "input":
				return new InputPrompt(question, answers);
			case "password":
				return new PasswordPrompt(question, answers);
			case "list":
				return new ListPrompt(question);
			case "confirm":
				return new ConfirmPrompt(question);
			case "checkbox":
				return new CheckboxPrompt(question);
			case "expand":
				return new ExpandPrompt(question);
			default:
				throw new Error(
					`Could not find a prompt for question type ${question.type}`,
				);
		}
	}
}
