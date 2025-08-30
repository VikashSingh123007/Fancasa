// TeamsModel.js

class TeamsModel {
  constructor({ id, name, country, foundedYear, logo }) {
    this.id = id || null;
    this.name = name || "";
    this.country = country || "";
    this.foundedYear = foundedYear || null;
    this.logo = logo || "";
  }

  // Optional: method to create instance from JSON (e.g., API response)
  static fromJson(json) {
    return new TeamsModel({
      id: json.id,
      name: json.name,
      country: json.country,
      foundedYear: json.foundedYear,
      logo: json.logo,
    });
  }

  // Optional: convert instance to JSON (for sending to API)
  toJson() {
    return {
      id: this.id,
      name: this.name,
      country: this.country,
      foundedYear: this.foundedYear,
      logo: this.logo,
    };
  }
}

export default TeamsModel;
