export { }

declare global {
	namespace nax {
		interface Consumable extends BaseItem {
			isBuff: boolean;
			stats: string[];
			time: number | undefined;
		}

		interface ConsumableCon extends ImpactClass<Consumable> {
			new(data: any): Consumable;
		}

		let Consumable: ConsumableCon;
	}
}