export class Images {
  images: {
    [key: string]: HTMLImageElement;
  };
  notFound: string[] = [];
  constructor() {
    this.images = {};
  }

  get(route: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (this.notFound.includes(route))
        throw new Error(`image ${route} is not found`);

      if (this.images[route] !== undefined)
        return resolve(this.images[route]);

      this.images[route] = new Image();
      this.images[route].addEventListener(
        "load",
        () => resolve(this.images[route])
      );
      this.images[route].addEventListener(
        "error",
        (err) => {
          this.notFound.push(route);
          throw new Error(`image ${route} is not found`);
        }
      );
      this.images[route].src = route;
    });
  }
}