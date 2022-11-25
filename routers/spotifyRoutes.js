import express from 'express'
import {
  getMyProfile,
  getMyPlaylists,
  getMyLikedSongs,
  getPlaylist,
  getArtist,
  setTrack,
  setVolume,
  likeTrack,
  unlikeTrack,
  updateShuffle,
  updateRepeat,
} from '../controllers/spotifyController.js'

const router = express.Router()

router.route('/myprofile').get(getMyProfile)
router.route('/myplaylists').get(getMyPlaylists)
router.route('/mylikedsongs').get(getMyLikedSongs)
router.route('/playlist/:id').get(getPlaylist)
router.route('/artist/:id').get(getArtist)

// player routes
router.route('/player/track/:deviceId').put(setTrack)
router.route('/player/volume/:deviceId').put(setVolume)
router.route('/track/:id').put(likeTrack).delete(unlikeTrack)
router.route('/shuffle/:state').put(updateShuffle)
router.route('/repeat/:state').put(updateRepeat)
export default router
