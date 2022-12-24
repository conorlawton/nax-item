export { }

declare global {
	namespace nax {
		interface BaseItem extends ig.Class {
			id: number;
			type: nax.ItemType;
			rarity: nax.ItemRarity;
			label: string;
			level: number;
			amount: number;
			noTrack: boolean;
			noCount: boolean;
			order?: number;
			name: ig.LangLabel.Data;
			description: ig.LangLabel.Data;
			icon: string;
			cost?: number;
			effect: ig.EffectSheet | undefined;
		}

		interface BaseItemCon extends ImpactClass<BaseItem> {
			new(data: any): BaseItem;
		}

		let BaseItem: BaseItemCon;
	}
}