export type GifFormat =
	| 'gif'
	| 'mediumgif'
	| 'tinygif'
	| 'nanogif'
	| 'mp4'
	| 'loopedmp4'
	| 'tinymp4'
	| 'nanomp4'
	| 'webm'
	| 'tinywebm'
	| 'nanowebm';

export interface Media {
	preview: string;
	url: string;
	dims: number[];
	size: number;
}

export interface Gif {
	created: number;
	hasaudio: boolean;
	id: string;
	// https://github.com/microsoft/TypeScript/issues/24220
	media_formats: { [format in GifFormat]: Media };
	tags: string[];
	title: string;
	content_description: string;
	itemurl: string;
	hascaption: boolean;
	flags: string;
	bg_color: string;
	url: string;
}
