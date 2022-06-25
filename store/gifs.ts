import { Gif } from '~/types/gifs';
import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '~/store/index';
import { Context } from '@nuxt/types';

export const Namespace = 'gifs';

export interface GifsState {
	isLoading: boolean;
	trendingGifs: Gif[];
	nextTrendingGifsPosition: string | null;
	gifs: Gif[];
	nextGifsPosition: string | null;
}

export const state = (): GifsState => ({
	isLoading: false,
	trendingGifs: [],
	nextTrendingGifsPosition: null,
	gifs: [],
	nextGifsPosition: null,
});

export const MutationType = {
	SET_IS_LOADING: 'setIsLoading',
	SET_TRENDING_GIFS: 'setTrendingGifs',
	SET_TRENDING_GIFS_NEXT_POSITION: 'setTrendingGifsNextPosition',
	SET_GIFS: 'setGifs',
	SET_GIFS_NEXT_POSITION: 'setGifsNextPosition',
};

export const mutations: MutationTree<GifsState> = {
	[MutationType.SET_IS_LOADING]: (state, newIsLoading: boolean) => {
		state.isLoading = newIsLoading;
	},

	[MutationType.SET_TRENDING_GIFS]: (state, newTrendingGifs: Gif[]) => {
		if (state.nextTrendingGifsPosition !== null) {
			state.trendingGifs = [...state.trendingGifs, ...newTrendingGifs];
		} else {
			state.trendingGifs = newTrendingGifs;
		}
	},

	[MutationType.SET_TRENDING_GIFS_NEXT_POSITION]: (state, nextPosition: string | null) => {
		state.nextTrendingGifsPosition = nextPosition;
	},

	[MutationType.SET_GIFS_NEXT_POSITION]: (state, nextPosition: string | null) => {
		state.nextGifsPosition = nextPosition;
	},

	[MutationType.SET_GIFS]: (state, newGifs: Gif[]) => {
		if (state.nextGifsPosition !== null) {
			state.gifs = [...state.gifs, ...newGifs];
		} else {
			state.gifs = newGifs;
		}
	},
};

export const ActionType = {
	FETCH_TRENDING_GIFS: 'fetchTrendingGifs',
	FETCH_GIFS: 'fetchGifs',
};

export const actions: ActionTree<GifsState, RootState> = {
	async [ActionType.FETCH_TRENDING_GIFS]({ commit, state }, params) {
		commit(MutationType.SET_IS_LOADING, true);

		if (state.nextTrendingGifsPosition) {
			params.pos = state.nextTrendingGifsPosition;
		}

		// extract results from response, corresponds to Gif[]
		const { results, next } = await this.$axios.$get('/featured', {
			params: {
				limit: 10,
				...params
			},
		});

		commit(MutationType.SET_TRENDING_GIFS, results);
		commit(MutationType.SET_TRENDING_GIFS_NEXT_POSITION, next);
		commit(MutationType.SET_IS_LOADING, false);
	},

	[ActionType.FETCH_GIFS]({ commit, state }, _context: Context) {
	}
};
