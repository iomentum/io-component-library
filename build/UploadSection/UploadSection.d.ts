import React, { FC } from "react";
import { FileInfo } from "../ThumbnailsMosaic/ThumbnailsMosaic";
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
export declare const UploadSection: FC<UploadSectionProps & React.HTMLProps<HTMLDivElement>>;
export {};
