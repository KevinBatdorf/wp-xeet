export const extractTwitterId = (input: string) =>
	/^\d+$/.test(input) ? input : (input.match(/\/status\/(\d+)/) || [])[1];
