/// <reference path="global.d.ts" />

import { Mod, PluginClass } from 'ultimate-crosscode-typedefs/modloader/mod';

export default class Item implements PluginClass {

	mod: Mod;

	constructor(mod: Mod) {
		this.mod = mod;
	}

	async prestart() {
		ig.lib = this.mod.baseDirectory.substring(7);
		// @ts-ignore File exists in build.
		ig._loadScript("nax-item.item");
	}

	postload() {
		ig.lib = "";
	}
}