export class Images {
  constructor() {
    this.wait = false;
    this.images = {};
  }

  get(route) {
    return new Promise((resolve, reject) => {
      if (this.wait === true)
        return resolve(false);

      if (this.images[route] !== undefined)
        return resolve(this.images[route]);

      this.wait = true;
      window.fetch(route)
        .then(res => res.blob())
        .then(blob => {
          this.images[route] = new Image();
          this.images[route].src = URL.createObjectURL(blob);
          this.wait = false;
          resolve(this.images[route]);
        });
    });
  }
}