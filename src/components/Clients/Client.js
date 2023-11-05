class Client {
  constructor(
    id,
    name,
    address,
    email,
    phone_number,
    category,
    users,
    percent,
    industry,
    startDate
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone_number = phone_number;
    this.category = category;
    this.users = users;
    this.percent = percent;
    this.industry = industry;
    this.startDate = startDate;
  }
}

export default Client;
