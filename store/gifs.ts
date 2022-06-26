import { Gif } from '~/types/gifs';
import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '~/store/index';
import { CancelTokenSource } from 'axios';

export const Namespace = 'gifs';

export interface GifsState {
	isLoading: boolean;
	trendingGifs: Gif[];
	trendingGifsNextPosition: string | null;
	gifs: Gif[];
	gifsNextPosition: string | null;
	cancelTokenSource: CancelTokenSource | null;
}

export const state = (): GifsState => ({
	isLoading: false,
	trendingGifs: [],
	trendingGifsNextPosition: null,
	gifs: [],
	gifsNextPosition: null,
	cancelTokenSource: null,
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
		state.cancelTokenSource = null;
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
		state.cancelTokenSource = null;
	},

	[MutationType.SET_CANCEL_TOKEN_SOURCE]: (state, cancelTokenSource: CancelTokenSource | null) => {
		state.cancelTokenSource = cancelTokenSource;
	}
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
			// if previous request running, cancel it
			if (state.cancelTokenSource) {
				state.cancelTokenSource.cancel();
			}

			const cancelTokenSource = this.$axios.CancelToken.source();

			commit(MutationType.SET_CANCEL_TOKEN_SOURCE, cancelTokenSource);

			// extract results from response, corresponds to Gif[]
			const { results, next } = await this.$axios.$get('/featured', {
				cancelToken: cancelTokenSource.token,
				params: {
					limit: 10,
					media_filter: 'gif',
					...params
				},
			});

			commit(MutationType.SET_TRENDING_GIFS, results);
			commit(MutationType.SET_TRENDING_GIFS_NEXT_POSITION, next);
			commit(MutationType.SET_CANCEL_TOKEN_SOURCE, null);
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

		try {
			// if previous request running, cancel it
			if (state.cancelTokenSource) {
				state.cancelTokenSource.cancel();
			}

			const cancelTokenSource = this.$axios.CancelToken.source();

			commit(MutationType.SET_CANCEL_TOKEN_SOURCE, cancelTokenSource);

			// extract results from response, corresponds to Gif[]
			const { results, next } = await this.$axios.$get('/search', {
				cancelToken: cancelTokenSource.token,
				params: {
					limit: 10,
					media_filter: 'gif',
					...params
				},
			});

			commit(MutationType.SET_GIFS, results);
			commit(MutationType.SET_GIFS_NEXT_POSITION, next);
			commit(MutationType.SET_CANCEL_TOKEN_SOURCE, null);
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
