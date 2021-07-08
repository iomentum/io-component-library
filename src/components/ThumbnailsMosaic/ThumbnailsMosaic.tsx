import React, { FC } from "react";
import {
  Container,
  ThumbnailBox,
  Image,
  MiddleBox,
} from "./ThumbnailsMosaic.style";
const copyIcon = require("./copy-icon.png");

export type FileInfo = {
  name: string;
  url: string;
};

interface ThumbnailsMosaicProps {
  /**
   * Files to display
   */
  fileList: FileInfo[];
}

export const ThumbnailsMosaic: FC<
  ThumbnailsMosaicProps & React.HTMLProps<HTMLDivElement>
> = (props) => {
  const { fileList, ...otherProps } = props;

  const copyToClipboard = (image: FileInfo) => {
    navigator.clipboard.writeText(image.url);
    // displayAlert({
    //   severity: "success",
    //   message: `${image.name} copié dans le press-papier`,
    // });
  };

  return (
    <Container {...otherProps}>
      {fileList.map((image, index) => (
        <ThumbnailBox key={index} onClick={() => copyToClipboard(image)}>
          <Image src={image.url} alt="Image" className="image" />
          <MiddleBox className="middle">
            <Image src={copyIcon} alt="copy-icon" className="copy-icon" />
          </MiddleBox>
        </ThumbnailBox>
      ))}
      <div />
    </Container>
  );
};
