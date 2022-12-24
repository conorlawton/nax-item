export { }

declare global {
	namespace nax {

		interface Scalable extends Equipable {
			baseLevel: number,
			params: EquipParams,
			baseparams: EquipParams,
			isScalable: true;
		}

		interface ScalableCon extends ImpactClass<Equipable> {
			new(data: any): Scalable;
		}

		let Scalable: ScalableCon;
	}
}