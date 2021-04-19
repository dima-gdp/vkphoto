export function fetchInitialPhotos() {
  return new Promise((resolve, reject) => {
    VK.Api.call(
      'newsfeed.get',
      {
        filters: 'photo, wall_photo',
        v: '5.73',
        source_ids: 'friends',
        max_photos: 10,
        count: 3
      },
      r => {
        if (r.response) {
          resolve(r.response)
        } else {
          reject(r.error)
        }
      }
    )
  })
}

export function fetchMorePhotos(start) {
  return new Promise((resolve, reject) => {
    VK.Api.call(
      'newsfeed.get',
      {
        filters: 'photo, wall_photo',
        v: '5.73',
        source_ids: 'friends',
        start_from: start,
        max_photos: 10,
        count: 3
      },
      r => {
        if (r.response) {
          resolve(r.response)
        } else {
          reject(r.error)
        }
      }
    )
  })
}

export function fetchSinglePhoto(photoId) {
  return new Promise((resolve, reject) => {
    VK.Api.call(
      'photos.getById',
      {
        photos: photoId,
        extended: 1,
        v: '5.73'
      },
      r => {
        console.log(r)
        if (r.response) {
          resolve(r.response[0])
        } else {
          reject(r.error)
        }
      }
    )
  })
}

export function fetchUser(uid) {
  return new Promise((resolve, reject) => {
    VK.Api.call(
      'users.get',
      {
        user_ids: uid,
        fields: 'photo_50',
        v: '5.73'
      },
      r => {
        if (r.response) {
          resolve(r.response[0])
        } else {
          reject(r.error)
        }
      }
    )
  })
}
