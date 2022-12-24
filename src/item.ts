/// <reference path="global.d.ts" />

// @ts-nocheck Required due to overwriting existing sc.inventory. Can't augment type.
window.nax = window.nax ?? {};

ig.module("nax-item.item")
	.requires(
		"nax-item.items.base-item",
		"nax-item.patches.inventory",
		"game.feature.inventory.inventory"
	)
	.defines(() => {
		sc.inventory = new nax.Inventory();
		sc.inventory.registerItemType(nax.ItemType.Consumable, nax.Consumable);
		sc.inventory.registerItemType(nax.ItemType.Equipable, nax.Equipable);
		sc.inventory.registerItemType(nax.ItemType.Tradable, nax.Tradable);
		sc.inventory.registerItemType(nax.ItemType.Key, nax.Key);
		sc.inventory.registerItemType(nax.ItemType.Toggleable, nax.Toggleable);
	});