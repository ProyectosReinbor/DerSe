import type { PathImage_ENGINE } from "./image";

export class Images_ENGINE {
  notFound: string[] = [];
  images: {
    [key: string]: HTMLImageElement;
  } = {};
  loadingImage: boolean = false;

  getImage(route: PathImage_ENGINE): HTMLImageElement | false {
    if (this.loadingImage === true)
      return false;

    if (this.notFound.includes(route) === true)
      return false;

    const image = this.images[route];
    if (image === undefined) {
      this.uploadImage(route);
      return false;
    }

    return image;
  }

  uploadImage(route: PathImage_ENGINE): void {
    if (this.notFound.includes(route) === true)
      return;

    const image = this.images[route];
    if (image !== undefined)
      return;

    this.loadingImage = true;
    const newImage = new Image();
    newImage.addEventListener(
      "load",
      () => {
        this.loadingImage = false;
        this.images[route] = newImage;
      }
    );
    newImage.addEventListener(
      "error",
      () => {
        throw new Error(`image ${route} is not found`);
        this.notFound.push(route)
      }
    );
    newImage.src = route;
  }
}