export { }

declare global {
	namespace nax {
		interface Equipable extends BaseItem {
			equipType: nax.EquipType;
			isScalable: boolean;
			params: EquipParams;
			properties: {[index: string]: number}
		}

		interface EquipableCon extends ImpactClass<Equipable> {
			new(data: any): Equipable;
		}

		let Equipable: EquipableCon;
	}
}