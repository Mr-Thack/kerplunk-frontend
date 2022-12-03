export function endpoint(e:string) {
	return window.location.protocol + '//' + window.location.hostname + ':80/api/' + e; 
}
