export { }

declare global {
	namespace nax {

		interface Inventory extends ig.SingleLoadable {
			_items: {[index: string]: {[index: number]: nax.BaseItem}};
			items: [nax.BaseItem];
			raritySuffixes: nax.RaritySuffixes;
			itemCtors: {[index: string]: (data: any)=>nax.BaseItem}
			scalable: nax.Scalable[];
			nameCrossCode: string;

			updateScaledEquipment(this: this, newLevel: number): void;
			isScalable(this: this, id: number, modName?: string): boolean;
			getItem(this: this, id: number, modName?: string): nax.BaseItem | null;
			getItemName(this: this, id: number, modName?: string): string | null;
			getItemByName(this: this, name: string, modName?: string): nax.BaseItem | null;
			getItemLevel(this: this, id: number, modName?: string): number;
			getItemID(this: this, name: string, modName?: string): number;
			getBuffString(this: this, id: number, displayTime?: boolean, stats?: string[]): string | undefined;
			areStatChangesRanksUniform(stat: string[]): string | undefined;
			isBuffID(this: this, id: number, modName?: string): boolean;
			isEquipID(this: this, id: number, modName?: string): boolean;
			getRaritySuffix(this: this, rarity: sc.ITEMS_RARITY | nax.ItemRarity): string | undefined;
			getItemNameWithIcon(this: this, id: number, modName?: string): string;
			getItemIcon(this: this, id: number, modName?: string): string;
			getItemDescription(this: this, id: number, modName?: string): string;
			getItemRarity(this: this, id: number, modName?: string): nax.ItemRarity | null;
			getItemSubType(this: this, id: number, modName?: string): nax.EquipType | null;
			isConsumable(this: this, id: number, modName?: string): boolean;
			getTotalItemsUnlocked(this: this, asPercent?: boolean, category?: ItemType, equipType?: EquipType, log?: boolean): number;

			// loading
			loadInternal(this: this): void;
			onLoad(this: this, data: any, modName?: string): void;
			onError(this: this, data: any, modName?: string): void;

			// Additions
			getItemCount(this: this): number;
			registerItemType(this: this, type: string, constructor: (data: any)=>nax.BaseItem ): void;
			registerItemRarity(this: this, rarity: string, suffix: string): void;
			registerItemRarities(this: this, kvp: {[key in sc.ITEMS_RARITY | nax.ItemRarity]: string} | {[index: string]: string}): void;
			getByMatch(this: this, regex: RegExp, modName?: string): nax.BaseItem[];
			loadCustomItemSet(this: this, path: string, modName: string): void;
		}

		interface InventoryCon extends ImpactClass<Inventory> {
			new(): Inventory
		}

		let Inventory: InventoryCon;
	}
}