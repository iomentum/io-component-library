import React, { FC, useEffect } from "react";

import { useDropzone } from "react-dropzone";
import { Container } from "./Dropzone.style";

import { resize } from "./image-utils";

interface DropzoneProps {
  setImageToUpload: (files: File[]) => void;
  setUploadError: (error: Error) => void;
}

const MAX_UPLOAD_SIZE = 1_000_000; // in bytes

const Dropzone: FC<DropzoneProps> = (props) => {
  const { setImageToUpload, setUploadError }: DropzoneProps = props;

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
      Promise.all(allFiles.map((file) => resize(file, MAX_UPLOAD_SIZE)))
        .then((files) => {
          setImageToUpload(files);
        })
        .catch((e) => {
          setUploadError(e);
        });
    }
  }, [allFiles, setImageToUpload, setUploadError]);

  return (
    <div className="container">
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        <p>
          Glissez-déposez votre image ici, ou cliquez pour rechercher un fichier
        </p>
      </Container>
    </div>
  );
};

export default Dropzone;
