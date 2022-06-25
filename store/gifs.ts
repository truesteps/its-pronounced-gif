import { Gif } from '~/types/gifs';
import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '~/store/index';
import { Context } from '@nuxt/types';

export const Namespace = 'gifs';

export interface GifsState {
	isLoading: boolean;
	trendingGifs: Gif[];
	gifs: Gif[];
}

export const state = (): GifsState => ({
	isLoading: false,
	trendingGifs: [],
	gifs: []
});

export const MutationType = {
	SET_IS_LOADING: 'setIsLoading',
	SET_TRENDING_GIFS: 'setTrendingGifs',
	SET_GIFS: 'setGifs',
};

export const mutations: MutationTree<GifsState> = {
	[MutationType.SET_IS_LOADING]: (state, newIsLoading: boolean) => {
		state.isLoading = newIsLoading;
	},

	[MutationType.SET_TRENDING_GIFS]: (state, newTrendingGifs: Gif[]) => {
		state.trendingGifs = newTrendingGifs;
	},

	[MutationType.SET_GIFS]: (state, newGifs: Gif[]) => {
		state.gifs = newGifs;
	},
};

export const ActionType = {
	FETCH_TRENDING_GIFS: 'fetchTrendingGifs',
	FETCH_GIFS: 'fetchGifs',
};

export const actions: ActionTree<GifsState, RootState> = {
	async [ActionType.FETCH_TRENDING_GIFS]({ commit, state }, params) {
		commit(MutationType.SET_IS_LOADING, true);

		// extract results from response, corresponds to Gif[]
		const { results } = await this.$axios.$get('/featured', {
			params: {
				limit: 10,
				...params
			},
		});

		commit(MutationType.SET_TRENDING_GIFS, results);
		commit(MutationType.SET_IS_LOADING, false);
	},

	[ActionType.FETCH_GIFS]({ commit, state }, _context: Context) {
	}
};
