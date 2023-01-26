export class Vehicle {
  public id: string;
  public size: "Normal" | "Mediano" | "Grande";
  public type: "car" | "moto" | "truck";
  public brand: string;
  public color: string;
  public model: string;
  public photo: string;

  constructor(
    id: string,
    size: "Normal" | "Mediano" | "Grande",
    type: "car" | "moto" | "truck",
    model: string,
    photo: string,
    brand: string,
    color: string
  ) {
    this.id = id;
    this.size = size;
    this.type = type;
    this.brand = brand;
    this.color = color;
    this.model = model;
    this.photo = photo;
  }

  getSize(): "Normal" | "Mediano" | "Grande" {
    return this.size;
  }

  getType(): "car" | "moto" | "truck" {
    return this.type;
  }

  getBrand(): string {
    return this.brand;
  }
  getAllData() {
    return {
      id: this.id,
      size: this.size,
      type: this.type,
      brand: this.brand,
      color: this.color,
      model: this.model,
      photo: this.photo
    };
  }

  getAllDataAsArray(): Array<any> {
    return [this.size, this.type, this.brand, this.color];
  }
}
