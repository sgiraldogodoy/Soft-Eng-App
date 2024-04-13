/**
 * scaleCoordinate function that scales the coordinate to the image size
 * @param coordinate coordinate on non-edited image
 * @param curSize current size of the image
 * @param origSize original size of image
 * @param offset image offset
 * @param dragOffset image drag offset
 * @param scale image scale
 */
const scaleCoordinate = (
  coordinate: number,
  curSize: number,
  origSize: number,
  offset: number,
  dragOffset: number,
  scale: number,
) => {
  return (
    ((coordinate * curSize) / origSize) * scale +
    offset +
    dragOffset * scale -
    (curSize * scale) / 2 +
    curSize / 2
  );
};

const reverseScaleCoordinate = (
  reversecoordinate: number,
  curSize: number,
  origSize: number,
  offset: number,
  dragOffset: number,
  scale: number,
) => {
  return (
    (((reversecoordinate + (curSize * scale) / 2 - curSize / 2 - offset) /
      scale) *
      origSize) /
      curSize -
    dragOffset
  );
};

export { scaleCoordinate, reverseScaleCoordinate };
