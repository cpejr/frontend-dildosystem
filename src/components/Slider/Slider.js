import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./styles.css";
import api from "../../services/api";
import nextIcon from "../../images/nextIcon.png";
import prevIcon from "../../images/prevIcon.png";

import urlAWS from '../../services/imagesAWS'

export default function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const [images, setImages] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: { authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    api.get("Carousel", config).then((response) => {
      setImages([...response.data]);
    });
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const getPrevNext = (index, images) => {
    let prev, next;
<<<<<<< HEAD
    if (index === 0) {
      prev = images.length - 1;
      next = index + 1;
    } else if (index === images.length - 1) {
=======
    if (index == 0) {
      prev = images.length - 1;
      next = index + 1;
    } else if (index == images.length - 1) {
>>>>>>> 85197458da5906ee9eae7d117a824d14391f3870
      prev = index - 1;
      next = 0;
    } else {
      prev = index - 1;
      next = index + 1;
    };
    return { prev, next };
  };

  return (
    <>
      {images && (
        <div className="Carousel">
          <Carousel activeIndex={index} onSelect={handleSelect} nextIcon={<span aria-hidden="true" className="" > <img src={nextIcon} /></span>} prevIcon={<span aria-hidden="true" className="" ><img src={prevIcon} /></span>}>
            {images.map((image, index) => {
              const isUniqueImage = images.length === 1;
<<<<<<< HEAD
              let prev = 0;
              let next = 0;
=======
              let prev, next;
>>>>>>> 85197458da5906ee9eae7d117a824d14391f3870
              if (!isUniqueImage) {
                const position = getPrevNext(index, images);
                prev = position.prev;
                next = position.next;
              }
              return (
                <Carousel.Item key={index}>
                  <div className="CarouselImages">
                    {!isUniqueImage && (
                      <div className="previmage">
                        <img
                          src={`${urlAWS}/${images[prev]?.image_id}`}
                        />
                      </div>
                    )}
                    <a href={image?.link}>
                      <img
                        className="d-block w-100"
                        src={`${urlAWS}/${image?.image_id}`}
                        alt={image}
                      />
                    </a>
                    {!isUniqueImage && (
                      <div className="nextimage">
                        <img
                          src={`${urlAWS}/${images[next]?.image_id}`}
                        />
                      </div>
                    )}
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
}
