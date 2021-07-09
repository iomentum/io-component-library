import React, { FC } from "react";
interface DropzoneProps {
    /**
     * SetState in which the images are stored onDrop
     */
    setImagesToUpload: (files: File[]) => void;
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
declare const Dropzone: FC<DropzoneProps & React.HTMLProps<HTMLDivElement>>;
export default Dropzone;
