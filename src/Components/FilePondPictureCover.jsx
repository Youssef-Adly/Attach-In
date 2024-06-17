import React from "react";
import { FilePond } from "react-filepond";

const FilePondPictureCover = ({ profileCover, setProfileCover }) => {
  return (
    <>
      <FilePond
        files={profileCover}
        onupdatefiles={setProfileCover}
        acceptedFileTypes={["image/*"]}
        credits={false}
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your Cover Picture or <span class="filepond--label-action">Browse</span>'
        imagePreviewWidth="250"
        imagePreviewHeight="150"
        imageResizeMode="contain"
        imageResizeTargetWidth="400"
        imageResizeTargetHeight="150"
      />
    </>
  );
};

export default FilePondPictureCover;
