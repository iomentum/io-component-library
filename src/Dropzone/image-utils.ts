const Blitz = require("blitz-resize");

// resize takes an image and a newSize as parameters.
//
// if the image is bigger than the allowed size, we will drop it's quality
// otherwise we will leave the file untouched
//
export async function resize(
  image: File,
  expectedWeight: number
): Promise<File> {
  if (expectedWeight >= image.size) {
    // nothing to do
    return image;
  } else {
    const ratioToApply = getSizeRatioToApply(image, expectedWeight);
    return resizeSizeWithRatio(image, ratioToApply);
  }
}

const contentsAsString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e?.target?.result;
      if (typeof contents !== "string") {
        return reject(new Error("couldn't read file contents"));
      }
      return resolve(contents);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

// Resizing some images won't be 1->1 size efficient.
// reducing an image size by 50% won't halve the file weight.
// We'll adjust the ratios here once we find good ones
const getMimeRatio = (file: File): number => {
  const mimeType = file.name.substring(file.name.lastIndexOf(".") + 1);
  switch (mimeType) {
    // this value is totally made up, we will probably need to dig deeper and adjust.
    case "png":
      return 0.8;
    default:
      return 1;
  }
};

// GetRatioToApply takes an image and the expected max file weight
// and tries to guess which size ratio should be applied
const getSizeRatioToApply = (image: File, expectedWeight: number) => {
  const mimeRatio = getMimeRatio(image);
  return (expectedWeight / image.size) * mimeRatio;
};

const blitz = Blitz.create();

// resizeWithRatio applies a ratio to an image,
async function resizeSizeWithRatio(
  image: File,
  ratioToApply: number
): Promise<File> {
  const fileURL = await contentsAsString(image);
  return new Promise((resolve, reject) => {
    let as_image = new Image();
    as_image.onload = async () => {
      const resized: File = await blitz({
        source: image,
        width: Math.floor(ratioToApply * as_image.width),
      });
      resolve(new File([resized], image.name, { type: resized.type }));
    };
    as_image.onerror = () => {
      reject(Error(`couldn't load image into canvas for resize ${image.name}`));
    };
    as_image.src = fileURL;
  });
}
