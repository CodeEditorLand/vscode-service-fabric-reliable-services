import { QuickPickItem, QuickPickOptions, window } from "vscode";

import EscapeException from "../utils/EscapeException";
import Prompt from "./prompt";

export default class ConfirmPrompt extends Prompt {
	constructor(question: any) {
		super(question);
	}

	public render() {
		const choices = {
			Yes: true,
			No: false,
		};

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
