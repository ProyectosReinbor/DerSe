import type { ImageRoute } from "./image";

export class Images {
  notFound: string[] = [];
  routes: ImageRoute[] = [];
  images: {
    [key: string]: HTMLImageElement;
  } = {};

  imageExists(route: ImageRoute): false | HTMLImageElement | undefined {
    if (route === false) return false;

    if (this.notFound.includes(route))
      throw new Error(`image ${route} is not found`);

    return this.images[route];
  }

  getImage(route: ImageRoute): HTMLImageElement | false {
    const image = this.imageExists(route);
    if (image === undefined)
      throw new Error(`image ${route} is not found`);

    return image;
  }

  addRoute(route: ImageRoute) {
    if (route === false)
      return;

    if (this.routes.includes(route) === true)
      return;

    this.routes.push(route);
  }

  async loadAll() {
    for (const route of this.routes) {
      await this.load(route);
    }
  }

  load(route: ImageRoute): Promise<HTMLImageElement | false> {
    return new Promise((resolve) => {
      if (route === false)
        return resolve(false);

      const imageExists = this.imageExists(route);

      if (imageExists !== undefined)
        return resolve(imageExists);

      const image = new Image();
      image.addEventListener(
        "load",
        () => {
          this.images[route] = image;
          resolve(image);
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