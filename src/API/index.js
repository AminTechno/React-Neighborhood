class Helper {
	static baseURL() {
		return "https://api.foursquare.com/v2";
	}
	static auth() {
		const keys = {
			client_id: "GH5GS3FX5B0Q5B5UQXTWS5WMWRRHFRYN5PYP2YFTTWXGEZRG",
			client_secret: "LAEJB0TY3JOM4ADHYN3SR100SRS1NBDGBKQ2P0AADDVYZ3RA",
			v: "20181018"
		};

		return Object.keys(keys)
			.map(key => `${key}=${keys[key]}`)
			.join("&");
	}

	static urlBuilder(urlPrams) {
		if (!urlPrams) {
			return "";
		}
		return Object.keys(urlPrams)
			.map(key => `${key}=${urlPrams[key]}`)
			.join("&");
	}

	static headers() {
		return {
			Accept: "application/json"
		};
	}

	static simpleFetch(endPoint, method, urlPrams) {
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(
			`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
				urlPrams
			)}`,
			requestData
		).then(res => res.json());
	}
}

export default class SquareAPI {
	static search(urlPrams) {
		return Helper.simpleFetch("/venues/search", "GET", urlPrams);
	}
	static getVenueDetails(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
	}
	static geVenuetPhotos(VENUE_ID) {
		return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}
