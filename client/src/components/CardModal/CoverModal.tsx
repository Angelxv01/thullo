import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_UNSPLASH_API } from "../../utils/config";
import { Absolute, Button, Flow, Icon, InputGroup, Text } from "../common";

type Base = string | number | symbol;
type Dictionary = Record<string, Base>;
type ApiResponse = Record<string, Dictionary | Base>;

const CoverModal = () => {
  const auth = {
    headers: {
      "Accept-Version": "v1",
      Authorization: `Client-ID ${REACT_APP_UNSPLASH_API}`,
    },
  };
  const [photos, setPhotos] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?count=12&content_filter=low",
        auth as AxiosRequestConfig<unknown>
      )
      .then(({ data }) =>
        setPhotos(
          (data as unknown as ApiResponse[]).map(
            (photo) => (photo.urls as Dictionary).thumb as string
          )
        )
      );
  }, []);

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
        <InputGroup props={{ placeholder: "Keywords..." }} width="100%">
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
              key={photo}
              style={{
                backgroundPosition: "cover",
                backgroundImage: `url(${photo})`,
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
