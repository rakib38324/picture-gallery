import { useState } from "react";

const PictureGallery = () => {
  const [boxes, setBoxes] = useState([
    {
      id: "box-1",
      content: "Box-1",
      img: "https://i.ibb.co/5jXtFc1/image-1.webp",
    },
    {
      id: "box-2",
      content: "Box-2",
      img: "https://i.ibb.co/HXzn1tQ/image-2.webp",
    },
    {
      id: "box-3",
      content: "Box-3",
      img: "https://i.ibb.co/NKN1vX8/image-3.webp",
    },
    {
      id: "box-4",
      content: "Box-4",
      img: "https://i.ibb.co/MnHyxHC/image-4.webp",
    },
    {
      id: "box-5",
      content: "Box-5",
      img: "https://i.ibb.co/MhZBb8S/image-5.webp",
    },
    {
      id: "box-6",
      content: "Box-6",
      img: "https://i.ibb.co/ZTY7NDn/image-6.webp",
    },
    {
      id: "box-7",
      content: "Box-7",
      img: "https://i.ibb.co/mXCQZr0/image-7.webp",
    },
    {
      id: "box-8",
      content: "Box-8",
      img: "https://i.ibb.co/G9gq16g/image-8.webp",
    },
    {
      id: "box-9",
      content: "Box-9",
      img: "https://i.ibb.co/CmznN6J/image-9.webp",
    },
    {
      id: "box-10",
      content: "Box-10",
      img: "https://i.ibb.co/hR3yrqf/image-10.jpg",
    },
    {
      id: "box-11",
      content: "Box-11",
      img: "https://i.ibb.co/sF3kNYh/image-11.jpg",
    },
  ]);

  const [imgHover,setImgHover] = useState('')


  const handleDragEnd = (sourceIndex, destinationIndex) => {
    const newBoxes = [...boxes];
    const [draggedBox] = newBoxes.splice(sourceIndex, 1);
    newBoxes.splice(destinationIndex, 0, draggedBox);
    setBoxes(newBoxes);
  };

  return (
    <div>
      <p className="text-center text-3xl font-semibold py-10">
        Assalamualikum <br /> Welcome to My Task Assesment
      </p>
      <div className=" grid grid-cols-6 grid-rows-5 gap-3">
        {boxes.map((box, index) => (
          
          <div
            key={box?.id}
            className={`relative box border-[1px] shadow-md border-gray-300 rounded-md ${
              index === 0 ? "col-span-2 row-span-2" : ""} `}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("DragComponent", index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const sourceIndex = e.dataTransfer.getData("DragComponent");
              handleDragEnd(Number(sourceIndex), index);
            }}
          >
            
            {imgHover === box?.id && 
            <div className="absolute w-full h-full opacity-40 top-0 bg-gray-500 z-30"></div>
            }
            <img onMouseEnter={()=>setImgHover(box?.id)} className={`rounded-md `} src={box?.img}></img>
            {
              imgHover === box?.id &&
              <input className="absolute top-3 left-2 h-5 w-5 z-40" type="checkbox" name="" id="" />
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureGallery;
