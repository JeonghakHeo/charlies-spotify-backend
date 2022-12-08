import request from 'request'

// @desc    Request user authorization
// @route   GET /api/auth/login
// @access  Public
export const requestUserAuthorization = (req, res) => {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
  const scope =
    'streaming user-read-email user-read-private playlist-read-collaborative user-modify-playback-state user-library-read user-library-modify'

  const state = generateRandomString(16)

  const authQueryParams = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope: scope,
    redirect_uri: 'https://charlies-spotify-frontend.onrender.com/',
    state: state,
  })

  res.send({
    redirectUrl:
      'https://accounts.spotify.com/authorize/?' + authQueryParams.toString(),
  })
}

// @desc    Request access token
// @route   GET /api/auth/callback
// @access  Public
export const requestAccessToken = (req, res) => {
  const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
  const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const code = req.query.code

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: 'https://charlies-spotify-frontend.onrender.com/',
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString(
          'base64'
        ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  }

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const { access_token, refresh_token } = body
      res.send({ access_token, refresh_token })
    } else {
      res.status(500)
    }
  })
}

const generateRandomString = (length) => {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
