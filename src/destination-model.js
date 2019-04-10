export class DestinationModel {
  constructor(data) {
    this._name = data[`name`];
    this._description = data[`description`];
    this._pictures = data[`pictures`];
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get pictures() {
    return this._pictures;
  }

  static parseDestination(destination) {
    return new DestinationModel(destination);
  }

  static parseServerData(destinationsArr) {
    const destinations = destinationsArr.map(DestinationModel.parseDestination);
    return destinations;
  }
}
