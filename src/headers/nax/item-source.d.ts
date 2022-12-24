export { }

declare global {
	namespace nax {
		interface ItemSource {
			type: ItemSourceType;
			value: string;
		}
	}
}