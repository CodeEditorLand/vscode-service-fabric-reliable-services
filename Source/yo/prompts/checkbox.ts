import { QuickPickItem, QuickPickOptions, window } from "vscode";

import EscapeException from "../utils/EscapeException";
import Prompt from "./prompt";

const figures = require("figures");

export default class CheckboxPrompt extends Prompt {
	constructor(question: any) {
		question.choices = question.choices.map((choice) => {
			if (typeof choice === "string") {
				return {
					name: choice,
					value: choice,
				};
			}

			return choice;
		});

		super(question);
	}

	public render() {
		let choices = this._question.choices.reduce((result, choice) => {
			result[
				`${choice.checked === true ? figures.radioOn : figures.radioOff} ${choice.name}`
			] = choice;

			return result;
		}, {});

		const options: QuickPickOptions = {
			placeHolder: this._question.message,
		};

		let quickPickOptions = Object.keys(choices);

		quickPickOptions.push(figures.tick);

		return window
			.showQuickPick(quickPickOptions, options)
			.then((result) => {
				if (result === undefined) {
					throw new EscapeException();
				}

				if (result !== figures.tick) {
					choices[result].checked = !choices[result].checked;

					return this.render();
				}

				return this._question.choices.reduce((result, choice) => {
					if (choice.checked === true) {
						result.push(choice.value);
					}

					return result;
				}, []);
			});
	}
}
