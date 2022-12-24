export { }

declare global {
	namespace nax {
		interface Toggleable extends BaseItem { }

		interface ToggleableCon extends ImpactClass<Toggleable> {
			new(data: any): Toggleable;
		}

		let Toggleable: ToggleableCon;
	}
}