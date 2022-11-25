import axios from 'axios'

// @desc    Get my playlists
// @route   GET /api/spotify/myprofile
// @access  Private
export const getMyProfile = async (req, res) => {
  const userId = process.env.MY_USER_ID
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://api.spotify.com/v1/users/${userId}`,
      config
    )

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Get my playlists
// @route   GET /api/spotify/myplaylists/:userId
// @access  Private
export const getMyPlaylists = async (req, res) => {
  const userId = process.env.MY_USER_ID
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      config
    )

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Get my liked songs
// @route   GET /api/spotify/mylikedsongs
// @access  Private
export const getMyLikedSongs = async (req, res) => {
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/tracks`,
      config
    )

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Get playlist details
// @route   GET /api/spotify/playlist/:id
// @access  Private
export const getPlaylist = async (req, res) => {
  const id = req.params.id
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${id}`,
      config
    )

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Get artists info
// @route   GET /api/spotify/artist/:id
// @access  Private
export const getArtist = async (req, res) => {
  const id = req.params.id
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(
      `https://api.spotify.com/v1/users/${id}`,
      config
    )

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Set track
// @route   PUT /api/spotify/player/:deviceId
// @access  Private
export const setTrack = async (req, res) => {
  const token = req.headers.authorization
  const deviceId = req.params.deviceId
  const song = req.body

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      song,
      config
    )

    res.status(200).json(true)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Like track
// @route   PUT /api/spotify/track/:id
// @access  Private
export const likeTrack = async (req, res) => {
  const id = req.params.id
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `https://api.spotify.com/v1/me/tracks?ids=${id}`,
      {},
      config
    )

    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/tracks`,
      config
    )
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Unlike track
// @route   PUT /api/spotify/track/:id
// @access  Private
export const unlikeTrack = async (req, res) => {
  const id = req.params.id
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${id}`, config)

    const { data } = await axios.get(
      `https://api.spotify.com/v1/me/tracks`,
      config
    )

    res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Update shuffle
// @route   PUT /api/spotify/shuffle/:state
// @access  Private
export const updateShuffle = async (req, res) => {
  const state = req.params.state
  const token = req.headers.authorization

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `https://api.spotify.com/v1/me/player/shuffle?state=${state}`,
      {},
      config
    )

    if (state === 'true') {
      return res.json(true)
    } else if (state === 'false') return res.json(false)
  } catch (error) {
    console.log(error)
  }
}

// @desc    Update repeat
// @route   PUT /api/spotify/repeat/:state
// @access  Private
export const updateRepeat = async (req, res) => {
  const token = req.headers.authorization
  const state = req.params.state
  const { deviceId } = req.body

  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `https://api.spotify.com/v1/me/player/repeat?state=${state}&device_id=${deviceId}`,
      {},
      config
    )

    if (state === 'context') {
      return res.status(200).json(1)
    }

    if (state === 'track') {
      return res.status(200).json(2)
    }

    if (state === 'off') {
      return res.status(200).json(0)
    }
  } catch (error) {
    console.log(error)
  }
}

// @desc    Set playback volume
// @route   GET /api/spotify/mytopartists
// @access  Private
export const setVolume = async (req, res) => {
  const token = req.headers.authorization
  const { deviceId } = req.params
  const { volume } = req.body
  try {
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    }

    await axios.put(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}&device_id=${deviceId}`,
      {},
      config
    )

    res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
  }
}
