export { }

declare global {
	namespace nax {
		interface Tradable extends BaseItem {
			sources: nax.ItemSource;
		}

		interface TradableCon extends ImpactClass<Tradable> {
			new(data: any): Tradable;
		}

		let Tradable: TradableCon;
	}
}