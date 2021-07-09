import React, { FC } from "react";
export declare type FileInfo = {
    name: string;
    url: string;
};
interface ThumbnailsMosaicProps {
    /**
     * Files to display
     */
    fileList: FileInfo[];
}
export declare const ThumbnailsMosaic: FC<ThumbnailsMosaicProps & React.HTMLProps<HTMLDivElement>>;
export {};
