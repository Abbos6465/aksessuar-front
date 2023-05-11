export function mediaUploadUrl() {
  return process.env.VUE_APP_BASE_API + 'media'
}
export function imageUrl(media) {
  return process.env.VUE_APP_BASE_API + 'media/image/' + media.name
}
