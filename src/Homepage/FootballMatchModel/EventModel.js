export default class EventModel {
  constructor(id, name, latitude, longitude, description,startTime, endTime,imageUrl) {
    this.id = id;
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
     this.imageUrl = imageUrl;
  }

  static fromJson(json) {
    return new EventModel(
      json.id,
      json.name,
      json.latitude,
      json.longitude,
      json.description,
      json.startTime,
      json.endTime,
      json.imageUrl
    );
  }
}
