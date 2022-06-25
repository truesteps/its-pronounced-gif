import { Gif } from '~/types/gifs';
import { ActionTree, MutationTree } from 'vuex';
import { RootState } from '~/store/index';
import { Context } from '@nuxt/types';

export interface GifsState {
	trendingGifs: Gif[];
	gifs: Gif[];
}

export const state = (): GifsState => ({
	trendingGifs: [],
	gifs: []
});

export const MutationType = {
	SET_TRENDING_GIFS: 'setTrendingGifs',
	SET_GIFS: 'setGifs',
};

export const mutations: MutationTree<GifsState> = {
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
	[ActionType.FETCH_TRENDING_GIFS]({ commit, state }, _context: Context) {
	},

	[ActionType.FETCH_GIFS]({ commit, state },  _context: Context) {
	}
};
