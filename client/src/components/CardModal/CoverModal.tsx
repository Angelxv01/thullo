import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce/lib";
import useInput from "../../hooks/useInput";
import { REACT_APP_UNSPLASH_API } from "../../utils/config";
import { Absolute, Button, Flow, Icon, InputGroup, Text } from "../common";

interface ApiResult {
  urls: Record<string, string>;
}

const CoverModal = ({ addCover }: { addCover: (photo: string) => void }) => {
  const photoFilterController = useInput("text");
  const [value] = useDebounce(photoFilterController.value, 500);
  const auth = {
    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${REACT_APP_UNSPLASH_API}`,
    },
  };

  const [photos, setPhotos] = useState<ApiResult["urls"][]>([]);
  useEffect(() => {
    console.log("trigger");
    axios
      .get(
        `https://api.unsplash.com/photos/random?count=12&content_filter=low&query=${value}`,
        auth as AxiosRequestConfig<unknown>
      )
      .then(({ data }: { data: ApiResult[] }) => {
        setPhotos(data.map((obj) => obj.urls));
      });
  }, [value[0]]);

  return (
    <Absolute
      style={{
        zIndex: 100,
        backgroundColor: "white",
        marginTop: "1em",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
        border: "1px solid #E0E0E0",
        padding: "1.5em 0.75em",
      }}
    >
      <Flow>
        <div>
          <Text>Photo Search</Text>
          <Text>Search Unsplash for photos</Text>
        </div>
        <InputGroup
          props={{ placeholder: "Keywords...", ...photoFilterController }}
          width="100%"
        >
          <Button.Squared>
            <Icon.Search />
          </Button.Squared>
        </InputGroup>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 50px)",
            gap: "0.5rem",
          }}
        >
          {photos.map((photo) => (
            <div
              onClick={() => addCover(photo.regular)}
              key={photo.thumb}
              style={{
                backgroundPosition: "cover",
                backgroundImage: `url(${photo.thumb as string})`,
                aspectRatio: "1",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            ></div>
          ))}
        </div>
      </Flow>
    </Absolute>
  );
};

export default CoverModal;
