class TwitterVideoVariant {
  constructor(raw){
    return {
      bitrate: raw['bitrate'] ? Number(raw['bitrate']) : 0,
      content_type: raw['content_type'] ? String(raw['content_type']) : "video/mp4",
      url: raw['url'] ? String(raw['url']) : ''
    }
  }
}
export default TwitterVideoVariant;
