import { AlbumFormData, SongFormData } from "../components/AdminModals";
import { axiosPublic } from "../config/axiosClient";
import Album from "../types/album";
import { Artist } from "../types/artist";
import { BasePlaylistItem, PlaylistProps } from "../types/playlist";
import { Song } from "../types/songs";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  username: string;
  confirmPassword: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  code: string;
}

export interface CreatePlaylistResponse {
  _id: string;
  userId: string;
  logo: string;
  title: string;
  playlistType: string;
  slug: string;
  description: string;
  songs: string[];
  duration: number;
}

export interface AuthResponse {
  _id: string;
  email: string;
  username: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  message?: string;
}

export interface LibraryResponse {
  _id: string;
  userId: string;
  artists: Artist[];
  playlists: BasePlaylistItem[];
}

export const register = async (data: RegisterData) =>
  axiosPublic.post<AuthResponse>("/auth/register", data);

export const login = async (data: LoginData) =>
  axiosPublic.post<AuthResponse>("/auth/login", data);

export const logout = async () =>
  axiosPublic.get<{ message: string }>("/auth/logout");

export const verifyEmail = async (code: string) =>
  axiosPublic.get<AuthResponse>(`/auth/verify-email/${code}`);

export const forgotPassword = async (email: string) =>
  axiosPublic.post<{ message: string }>(`/auth/forgot-password`, { email });

export const resetPassword = async (data: ResetPasswordData) =>
  axiosPublic.put<AuthResponse>(`/auth/reset-password`, data);

export const createCustomPlaylist = async (): Promise<CreatePlaylistResponse> =>
  axiosPublic.post("/user/create-playlist");

export const getUser = async (): Promise<AuthResponse> =>
  axiosPublic.get("/user");

export const getUserLibrary = async (): Promise<LibraryResponse> =>
  axiosPublic.get("/user/library");

export const getArtist = async (artistSlug: string): Promise<Artist> =>
  axiosPublic.get(`/artist/${artistSlug}`);

export const getPlaylist = async (
  playlistSlug: string
): Promise<PlaylistProps> => axiosPublic.get(`/playlist/${playlistSlug}`);

export const getSongs = async (): Promise<Song[]> => axiosPublic.get("/song");

export const getSong = async (songSlug: string): Promise<Song> =>
  axiosPublic.get(`/song/${songSlug}`);

export const getAlbum = async (albumSlug: string): Promise<Album> =>
  axiosPublic.get(`/album/${albumSlug}`);

export const getArtists = async (): Promise<Artist[]> =>
  axiosPublic.get("/artist");

export const getAlbums = async (): Promise<Album[]> =>
  axiosPublic.get("/album");

export const createSong = async (songFormData: SongFormData): Promise<Song> =>
  axiosPublic.post("/admin/create-song", { songFormData });

export const createAlbum = async (
  albumFormData: AlbumFormData
): Promise<Album> => axiosPublic.post("/admin/create-album", { albumFormData });
