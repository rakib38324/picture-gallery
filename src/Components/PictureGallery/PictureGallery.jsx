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

  const [imgHover, setImgHover] = useState("");
  const [selectedList, setSelectedList] = useState([]);

  const handleCheckboxChange = (id) => {
    if (selectedList.find((item) => item === id)) {
      //delete id from array with the previous state
      let newList = selectedList.filter((item) => item !== id);
      setSelectedList(newList);
    } else {
      // Create a new array with the previous state and the new id
      setSelectedList([...selectedList, id]);
    }

    console.log("paise mama", selectedList);
  };

  const handleDragEnd = (sourceIndex, destinationIndex) => {
    const newBoxes = [...boxes];
    const [draggedBox] = newBoxes.splice(sourceIndex, 1);
    newBoxes.splice(destinationIndex, 0, draggedBox);
    setBoxes(newBoxes);
  };

  return (
    <div className="w-2/3 mx-auto">
      
      {/* title of the pages */}
      <p className="text-center text-3xl font-semibold py-10">
        Assalamualikum <br /> Welcome to My Task Assesment
      </p>

      {/* sub title and actions for delete */}
      <div>
        {selectedList.length > 0 ? (
          <div className="flex gap-4 justify-center items-center">
            <input
              className="h-5 w-5 z-40" type="checkbox" name="" id="" checked
            />

            <p className="text-xl font-semibold my-10">
              {selectedList.length} {selectedList.length > 1 ? "Files" : "File"}{" "}
              Selected
            </p>
            <button className="text-lg text-white font-semibold rounded-xl px-4 py-2  bg-red-400 hover:bg-red-600">Delete {selectedList.length > 1 ? "Files" : "File"}</button>
          </div>
        ) : (
          <div>
            <p className="text-2xl font-semibold my-10 text-center">Gallery</p>
          </div>
        )}
      </div>

      <hr />
      <br />

      

        {/* main gellary */}
      <div className=" grid grid-cols-5 gap-3">
        {boxes.map((box, index) => (
          <div
            onMouseEnter={() => setImgHover(box?.id)}
            onMouseLeave={() => setImgHover("")}
            key={box?.id}
            className={`relative cursor-pointer box border-[1px] shadow-md border-gray-300 rounded-md ${
              index === 0 ? "col-span-2 row-span-2" : ""
            } `}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("DragComponent", index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const sourceIndex = e.dataTransfer.getData("DragComponent");
              handleDragEnd(Number(sourceIndex), index);
            }}
          >
            {selectedList.find((item) => item === box?.id) ||
            imgHover === box?.id ? (
              <div className="absolute w-full h-full opacity-40 top-0 bg-gray-500 z-30"></div>
            ) : (
              imgHover === box?.id && (
                <div className="absolute w-full h-full opacity-40 top-0 bg-gray-500 z-30"></div>
              )
            )}


            <img className={`rounded-md`} src={box?.img}></img>

            {selectedList.find((item) => item === box?.id) ? (
              <input
                onClick={() => handleCheckboxChange(box?.id)}
                className="absolute cursor-pointer top-3 left-2 h-5 w-5 z-40"
                type="checkbox"
                name=""
                id=""
                checked
              />
            ) : (
              imgHover === box?.id && (
                <input
                  onClick={() => handleCheckboxChange(box?.id)}
                  className="absolute cursor-pointer top-3 left-2 h-5 w-5 z-40"
                  type="checkbox"
                  name=""
                  id=""
                />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PictureGallery;
