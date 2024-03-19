export class Images {
  notFound: string[] = [];
  routes: string[] = [];
  images: {
    [key: string]: HTMLImageElement;
  } = {};

  imageExists(route: string): boolean {
    if (this.notFound.includes(route))
      throw new Error(`image ${route} is not found`);

    if (this.images[route] === undefined)
      return false;

    return true;
  }

  getImage(route: string): HTMLImageElement {
    if (this.imageExists(route) === false)
      throw new Error(`image ${route} is not found`);

    return this.images[route];
  }

  addRoute(route: string) {
    if (this.routes.includes(route) === true)
      return;
    this.routes.push(route);
  }

  async loadAll() {
    for (const route of this.routes) {
      await this.load(route);
    }
  }

  load(route: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      if (this.imageExists(route) === true)
        return resolve(this.images[route]);

      const image = new Image();
      image.addEventListener(
        "load",
        () => {
          this.images[route] = image;
          resolve(this.images[route]);
        }
      );
      image.addEventListener(
        "error",
        () => this.notFound.push(route)
      );
      image.src = route;
    });
  }
}