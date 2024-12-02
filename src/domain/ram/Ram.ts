export default class Ram {
	constructor(private reaction: string) {}

	getReaction(): string {
		return this.reaction
	}

	clone(): Ram {
		return new Ram(this.reaction)
	}
}
