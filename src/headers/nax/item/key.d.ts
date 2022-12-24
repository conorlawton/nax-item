export { }

declare global {
	namespace nax {
		interface Key extends BaseItem { }

		interface KeyCon extends ImpactClass<Key> {
			new(data: any): Key;
		}

		let Key: KeyCon;
	}
}