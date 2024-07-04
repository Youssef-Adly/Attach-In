import React, { memo } from "react";
import { FilePond } from "react-filepond";

const FilePondPicture = ({ profilePic, setProfilePic }) => {
  return (
    <>
      <FilePond
        files={profilePic}
        onupdatefiles={setProfilePic}
        acceptedFileTypes={["image/*"]}
        credits={false}
        name="files" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your Profile Picture or <span class="filepond--label-action">Browse</span>'
        imagePreviewHeight="100"
        imageCropAspectRatio="1:1"
        imageResizeTargetWidth="200"
        imageResizeTargetHeight="200"
        stylePanelLayout="compact circle"
        styleButtonRemoveItemPosition="center bottom"
        // Access-Control-Expose-Headers="Content-Disposition"
      />
    </>
  );
};

export default memo(FilePondPicture);
