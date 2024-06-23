class AudireApi {
	EndPoint = "https://jiosaavn-api-ts.vercel.app";

	Other = {
		devotional: 32,
		topGenreAndMood: 76,
		trendingPodcasts: 107,
		newReleaseHindi: 113,
		topAlbumsHindi: 116,
		bestofSocietyAndCulture: 138,
	};

	async #jioSaavnApiGetCall(path = "") {
		const url = `${this.EndPoint}${path.startsWith("/") ? path : `/${path}`}`;
		const response = await (await fetch(url)).json();
		return response.data || [];
	}
	async #jioSaavnGetCall(path = "") {
		const url = `https://saavn.dev/api${path.startsWith("/") ? path : `/${path}`}`;
		const response = await (await fetch(url)).json();
		return response.data || [];
	}
	async #princeSaavnGetCall(path = "") {
		const url = `https://saavn.princexd.vercel.app/${path.startsWith("/") ? path : `/${path}`}`;
		const response = await (await fetch(url)).json();
		return response.data || [];
	}

	async getHomeData() {
		return (await this.#jioSaavnApiGetCall("/modules?language=hindi")) || [];
	}
	async getTopSearch() {
		return (await this.#jioSaavnApiGetCall("/search/top")) || [];
	}
	async getAlbumData() {
		return (await this.#princeSaavnGetCall("/modules?language=hindi")) || [];
	}

	async getAlbumDetails(query = "") {
		if (query.includes("http"))
			return (await this.#jioSaavnApiGetCall(`/album?link=${query}`)) || [];
		else return (await this.#jioSaavnApiGetCall(`/album?id=${query}`)) || [];
	}

	async getArtistDetails(query = "") {
		if (query.includes("http"))
			return (await this.#jioSaavnApiGetCall(`/artist?link=${query}`)) || [];
		else return (await this.#jioSaavnApiGetCall(`/artist?id=${query}`)) || [];
	}

	async getPlaylistDetails(query) {
		return await this.#jioSaavnApiGetCall(`/playlist?id=${query}`);
	}

	async getSongRecommendations(id) {
		return await this.#jioSaavnApiGetCall(`/song/recommend?id=${id}&lang=hindi`);
	}
	async getAlbumRecommendations(id) {
		return await this.#jioSaavnApiGetCall(`/album/recommend?id=${id}`);
	}
	async getPlaylistRecommendations(id) {
		return await this.#jioSaavnApiGetCall(`/playlist/recommend?id=${id}`);
	}

	async getSongDetails(query = "") {
		if (query.includes("http"))
			return (await this.#jioSaavnApiGetCall(`/song?link=${query}`)) || [];
		else return (await this.#jioSaavnApiGetCall(`/song?id=${query}`)) || [];
	}

	async searchAll(query = "") {
		return await this.#jioSaavnApiGetCall(
			`/search?query=${query.toLowerCase().replaceAll(" ", "+")}`
		);
	}
	async searchSongs(query = "") {
		return await this.#jioSaavnGetCall(
			`/search?query=${query.toLowerCase().replaceAll(" ", "+")}&limit=30`
		);
	}
	async searchAlbums(query = "") {
		return await this.#jioSaavnApiGetCall(
			`/search/albums?query=${query.toLowerCase().replaceAll(" ", "+")}`
		);
	}
	async SearchLyrics(id = "") {
		return await this.#jioSaavnApiGetCall(
			`/get/lyrics?id=${id}`
		);
	}

}

const audire = new AudireApi();
export default audire;