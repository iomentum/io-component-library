import React, { FC, useEffect } from "react";

import { useDropzone } from "react-dropzone";
import { Container } from "./Dropzone.style";

import { resize } from "./image-utils";

interface DropzoneProps {
  /**
   * SetState in which the images are stored onDrop
   */
  setImageToUpload: (files: File[]) => void;
  /**
   * SetState by the error Value
   */
  setUploadError: (error: Error) => void;
  /**
   * Max file size in bytes
   * 1_000_000 by default
   */
  maxUploadSize?: number;
  /**
   * Placefolder in the middle of the area
   * "Glissez-déposez votre image ici, ou cliquez pour rechercher un fichier" by default
   */
  label?: string;
}

const Dropzone: FC<DropzoneProps> = (props) => {
  const {
    setImageToUpload,
    setUploadError,
    maxUploadSize = 1_000_000,
    label = "Glissez-déposez votre image ici, ou cliquez pour rechercher un fichier",
  }: DropzoneProps = props;

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles: allFiles,
  } = useDropzone({ accept: "image/*" });

  useEffect(() => {
    if (allFiles.length > 0) {
      Promise.all(allFiles.map((file) => resize(file, maxUploadSize)))
        .then((files) => {
          setImageToUpload(files);
        })
        .catch((e) => {
          setUploadError(e);
        });
    }
  }, [allFiles, setImageToUpload, setUploadError]);

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>{label}</p>
    </Container>
  );
};

export default Dropzone;
