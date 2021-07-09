import React, { FC, useState } from "react";
import Dropzone from "../Dropzone/Dropzone";
import {
  FileInfo,
  ThumbnailsMosaic,
} from "../ThumbnailsMosaic/ThumbnailsMosaic";
import { ErrorBox } from "./UploadSection.style";

interface UploadSectionProps {
  /**
   * setState in which we store the files before uploading with the API
   */
  setImagesReadyForUpload: (newVal: File[]) => void;
  /**
   * Files to display
   */
  filesToDisplay: FileInfo[];
}

export const UploadSection: FC<
  UploadSectionProps & React.HTMLProps<HTMLDivElement>
> = (props) => {
  const { setImagesReadyForUpload, filesToDisplay, ...otherProps } = props;

  const [, setUploadError] = useState<Error | null>(null);
  const uploadError = "Le fichier n'est pas bon"; // FIXME: tmps

  return (
    <div {...otherProps}>
      <Dropzone
        setImagesToUpload={setImagesReadyForUpload}
        setUploadError={setUploadError}
      />

      {uploadError && (
        <ErrorBox>
          <h4>Un erreur est survenue lors de l'envoi d'images:</h4>
          <p> {uploadError} </p>
        </ErrorBox>
      )}

      <ThumbnailsMosaic fileList={filesToDisplay} />
    </div>
  );
};
