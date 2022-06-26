import { Gif } from '~/types/gifs';
import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '~/store/index';

export const Namespace = 'gifs';

export interface GifsState {
	isLoading: boolean;
	trendingGifs: Gif[];
	trendingGifsNextPosition: string | null;
	gifs: Gif[];
	gifsNextPosition: string | null;
}

export const state = (): GifsState => ({
	isLoading: false,
	trendingGifs: [],
	trendingGifsNextPosition: null,
	gifs: [],
	gifsNextPosition: null,
});

export const MutationType = {
	SET_IS_LOADING: 'setIsLoading',
	SET_TRENDING_GIFS: 'setTrendingGifs',
	SET_TRENDING_GIFS_NEXT_POSITION: 'setTrendingGifsNextPosition',
	RESET_TRENDING_GIFS: 'resetTrendingGifs',
	SET_GIFS: 'setGifs',
	SET_GIFS_NEXT_POSITION: 'setGifsNextPosition',
	RESET_GIFS: 'resetGifs',
	SET_CANCEL_TOKEN_SOURCE: 'setCancelTokenSource',
};

export const mutations: MutationTree<GifsState> = {
	[MutationType.SET_IS_LOADING]: (state, newIsLoading: boolean) => {
		state.isLoading = newIsLoading;
	},

	[MutationType.SET_TRENDING_GIFS]: (state, newTrendingGifs: Gif[]) => {
		if (state.trendingGifsNextPosition !== null) {
			state.trendingGifs = [...state.trendingGifs, ...newTrendingGifs];
		} else {
			state.trendingGifs = newTrendingGifs;
		}
	},

	[MutationType.SET_TRENDING_GIFS_NEXT_POSITION]: (state, nextPosition: string | null) => {
		state.trendingGifsNextPosition = nextPosition;
	},

	[MutationType.RESET_TRENDING_GIFS]: (state) => {
		state.trendingGifs = [];
		state.trendingGifsNextPosition = null;
	},

	[MutationType.SET_GIFS]: (state, newGifs: Gif[]) => {
		if (state.gifsNextPosition !== null) {
			state.gifs = [...state.gifs, ...newGifs];
		} else {
			state.gifs = newGifs;
		}
	},

	[MutationType.SET_GIFS_NEXT_POSITION]: (state, nextPosition: string | null) => {
		state.gifsNextPosition = nextPosition;
	},

	[MutationType.RESET_GIFS]: (state) => {
		state.gifs = [];
		state.gifsNextPosition = null;
	},
};

export const ActionType = {
	FETCH_TRENDING_GIFS: 'fetchTrendingGifs',
	FETCH_GIFS: 'fetchGifs',
};

export const actions: ActionTree<GifsState, RootState> = {
	async [ActionType.FETCH_TRENDING_GIFS]({ commit, state }, params: any) {
		commit(MutationType.SET_IS_LOADING, true);

		if (state.trendingGifsNextPosition) {
			params.pos = state.trendingGifsNextPosition;
		}

		try {
			// extract results from response, corresponds to Gif[]
			const { results, next } = await this.$axios.$get('/featured', {
				cancelToken: this.$helpers.getCancelToken('gifs/trendingGifs'),
				params: {
					limit: 10,
					media_filter: 'gif',
					...params
				},
			});

			commit(MutationType.SET_TRENDING_GIFS, results);
			commit(MutationType.SET_TRENDING_GIFS_NEXT_POSITION, next);
		} catch (error) {
			if (this.$axios.isCancel(error)) {
				console.log('Request canceled', error);
				return;
			}

			alert('Oops! Something went wrong. Please try again later.');
			console.error(error);
		}

		commit(MutationType.SET_IS_LOADING, false);
	},

	async [ActionType.FETCH_GIFS]({ commit, state }, params: any) {
		commit(MutationType.SET_IS_LOADING, true);

		if (state.gifsNextPosition) {
			params.pos = state.gifsNextPosition;
		}

		// if someone enables superfast speed and try to be all funny guy, we don't want the app to break
		if (!params.q || params.q.length < 3) {
			console.log('[gifs.ts] Request skipped, empty query.');
			commit(MutationType.SET_IS_LOADING, false);
			return;
		}

		try {
			// extract results from response, corresponds to Gif[]
			const { results, next } = await this.$axios.$get('/search', {
				cancelToken: this.$helpers.getCancelToken('gifs/gifs'),
				params: {
					limit: 10,
					media_filter: 'gif',
					...params
				},
			});

			commit(MutationType.SET_GIFS, results);
			commit(MutationType.SET_GIFS_NEXT_POSITION, next);
		} catch (error) {
			if (this.$axios.isCancel(error)) {
				console.log('Request canceled', error);
				return;
			}

			alert('Oops! Something went wrong. Please try again later.');
			console.error(error);
		}

		commit(MutationType.SET_IS_LOADING, false);
	}
};
