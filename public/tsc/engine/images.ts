import type { ImagePath } from "./image";

export class Images_ENGINE {
  notFound: string[] = [];
  routes: ImagePath[] = [];
  images: {
    [key: string]: HTMLImageElement;
  } = {};

  theImageExists(route: ImagePath): false | HTMLImageElement | undefined {
    if (route === false)
      return false;

    if (this.notFound.includes(route))
      throw new Error(`image ${route} is not found`);

    return this.images[route];
  }

  getImage(route: ImagePath): HTMLImageElement | false {
    const image = this.theImageExists(route);
    if (image === undefined)
      throw new Error(`image ${route} is not found`);

    return image;
  }

  addRoute(route: ImagePath) {
    if (route === false)
      return;

    if (this.routes.includes(route) === true)
      return;

    this.routes.push(route);
  }

  async loadAll() {
    for (const route of this.routes) {
      await this.uploadImage(route);
    }
  }

  uploadImage(route: ImagePath): Promise<HTMLImageElement | false> {
    return new Promise((resolve) => {
      if (route === false)
        return resolve(false);

      const imageExists = this.theImageExists(route);

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