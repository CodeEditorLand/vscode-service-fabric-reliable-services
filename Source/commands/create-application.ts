import * as vscode from "vscode";

import {
	quickPickLanguage,
	quickPickServiceType,
} from "../configureWorkspace/config-utils";
import { generatorProject } from "../yo";

export async function createApplication() {
	await generatorProject(false);
}
