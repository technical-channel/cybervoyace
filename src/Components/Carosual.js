import React from "react";
import { Carousel } from "react-bootstrap";
import "./carosual.css";
import one from "./Carosual/two.png";
import two from "./Carosual/three.png";
import three from "./Carosual/four.png";
import four from "./Carosual/five.png";
import five from "./Carosual/six.png";
import six from "./Carosual/seven.png";
import seven from "./Carosual/eight.png";
import eight from "./Carosual/nine.png";
import nine from "./Carosual/ten.png";
import ten from "./Carosual/eleven.png";
import eleven from "./Carosual/twelev.png";

export default function Carosual() {
  const data = [
    {
      id: "1",
      src: { one },
      alt: "ssssssss",
      Description: "first description",
    },
    {
      id: "2",
      src: { two },
      alt: "sssssssssss",
      Description: "second description",
    },
    {
      id: "3",
      src: { three },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "4",
      src: { four },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "5",
      src: { five },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "6",
      src: { six },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "7",
      src: { seven },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "8",
      src: { eight },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "9",
      src: { nine },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "10",
      src: { ten },
      alt: "ssssssssss",
      Description: "third description",
    },
    {
      id: "11",
      src: { eleven },
      alt: "ssssssssss",
      Description: "third description",
    },
  ];
  return (
    <>
      <h1 style={{ textAlign: "center", padding: 20 }}>Image Gallery</h1>
      <Carousel>
        {data.map((name, key) => (
          <Carousel.Item key={name.id}>
            <img
              className="d-block w-fit-content"
              style={{ padding: 20 }}
              src={one}
              alt={JSON.stringify(name.src)}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
