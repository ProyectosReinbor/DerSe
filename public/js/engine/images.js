export class Images {
  constructor() {
    this.images = {};
  }

  get(route) {
    return new Promise((resolve, reject) => {
      if (this.images[route] !== undefined)
        return resolve(this.images[route]);

      this.images[route] = new Image();
      this.images[route].addEventListener(
        "load",
        () => resolve(this.images[route])
      );
      this.images[route].addEventListener(
        "error",
        () => {
          throw new Error(`image ${route} is not found`);
        }
      );
      this.images[route].src = route;
    });
  }
}