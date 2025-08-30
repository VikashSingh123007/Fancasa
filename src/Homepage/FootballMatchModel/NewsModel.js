export default class NewsModel {
  constructor(id, title, description, publishedDate, imageUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.publishedDate = publishedDate;
    this.imageUrl = imageUrl;
  }

  static fromJson(json) {
    return new NewsModel(
      json.id,
      json.title,
      json.description,
      json.publishedDate,
      json.imageUrl
    );
  }
}
