import { QuickPickOptions, window } from "vscode";

import EscapeException from "../utils/EscapeException";
import Prompt from "./prompt";

export default class ExpandPrompt extends Prompt {
	constructor(question: any) {
		super(question);
	}

	public render() {
		const choices = this._question.choices.reduce((result, choice) => {
			result[choice.name] = choice.value;
			return result;
		}, {});

		const options: QuickPickOptions = {
			placeHolder: this._question.message,
		};

		return window
			.showQuickPick(Object.keys(choices), options)
			.then((result) => {
				if (result === undefined) {
					throw new EscapeException();
				}

				return choices[result] || false;
			});
	}
}
