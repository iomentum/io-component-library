import React, { FC } from "react";
import {
  Container,
  ThumbnailBox,
  Image,
  MiddleBox,
} from "./ThumbnailsMosaic.style";
const copyIcon = require("./copy-icon.png");

type FileInfo = {
  name: String;
  url: String;
};

interface ThumbnailsMosaicProps {
  /**
   * Files to display
   */
  fileList: FileInfo[];
}

const assetsURL = process.env.REACT_APP_PUBLIC_ASSETS_ROOT_URL;
//   || window.env.PUBLIC_ASSETS_ROOT_URL;

const ThumbnailsMosaic: FC<ThumbnailsMosaicProps> = (props) => {
  const { fileList } = props;

  const copyToClipboard = (image: FileInfo) => {
    const imageAbsoluteURL = `${assetsURL}/${image.url}`;
    navigator.clipboard.writeText(imageAbsoluteURL);
    // displayAlert({
    //   severity: "success",
    //   message: `${fileNameInToaster} copié dans le press-papier`,
    // });
  };

  return (
    <Container>
      {fileList.map((image, index) => (
        <ThumbnailBox key={index} onClick={() => copyToClipboard(image)}>
          <Image src={`${assetsURL}/${image.url}`} alt="Image" />
          <MiddleBox>
            <Image src={copyIcon} alt="copy-icon" />
          </MiddleBox>
        </ThumbnailBox>
      ))}
    </Container>
  );
};

export default ThumbnailsMosaic;
