import React, { FC, useState } from "react";
import Dropzone from "../Dropzone/Dropzone";
import {
  FileInfo,
  ThumbnailsMosaic,
} from "../ThumbnailsMosaic/ThumbnailsMosaic";
import { ErrorBox } from "./UploadSection.style";

interface UploadSectionProps {
  imagesReadyForUploadState: [File[], (newVal: File[]) => void];
  filesToDisplay: FileInfo[];
}

export const UploadSection: FC<UploadSectionProps> = (props) => {
  const { imagesReadyForUploadState, filesToDisplay } = props;

  const [
    imagesReadyForUpload,
    setImagesReadyForUpload,
  ] = imagesReadyForUploadState;

  const [, setUploadError] = useState<Error | null>(null);
  const uploadError = "Le fichier n'est pas bon"; // FIXME: tmps

  //   console.log({ imagesReadyForUpload });
  console.log({ filesToDisplay });

  return (
    <div>
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
