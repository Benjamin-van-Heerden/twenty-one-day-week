export function get_cookie(name: string) {
	return document.cookie.split(";").some((c) => {
		return c.trim().startsWith(name + "=");
	});
}

export function delete_cookie(name: string) {
	document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
