export class Images {
  wait: boolean = false;
  images: {
    [key: string]: HTMLImageElement;
  } = {};

  get(route: string): Promise<HTMLImageElement | false> {
    return new Promise((resolve, reject) => {
      if (this.wait === true) resolve(false);
      else {
        if (this.images[route] === undefined) {
          this.wait = true;
          window.fetch(route)
            .then(res => res.blob())
            .then(blob => {
              this.images[route] = new Image();
              this.images[route].src = URL.createObjectURL(blob);
              resolve(this.images[route]);
              this.wait = false;
            });
        } else {
          resolve(this.images[route]);
        }
      }
    });
  }
}