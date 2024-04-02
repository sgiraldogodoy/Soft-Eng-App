/**
 * scaleCoordinate function that scales the coordinate to the image size
 * @param coordinate coordinate on non-edited image
 * @param curSize current size of the image
 * @param origSize original size of image
 * @param offset image offset
 */
const scaleCoordinate = (
  coordinate: number,
  curSize: number,
  origSize: number,
  offset: number,
) => {
  return coordinate * (curSize / origSize) + offset;
};

export { scaleCoordinate };
