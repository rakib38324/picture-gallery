import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcAddImage } from "react-icons/fc";
import Loading from "../Common/loading";

const PictureGallery = () => {
  const [boxes, setBoxes] = useState([]);
  const [imgHover, setImgHover] = useState("");
  const [attachment, setAttachment]= useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (id) => {
    if (selectedList.find((item) => item === id)) {
      //delete id from array with the previous state
      let newList = selectedList.filter((item) => item !== id);
      setSelectedList(newList);
    } else {
      // Create a new array with the previous state and the new id
      setSelectedList([...selectedList, id]);
    }
  };

  const handleDragEnd = (sourceIndex, destinationIndex) => {
    const newBoxes = [...boxes];
    const [draggedBox] = newBoxes.splice(sourceIndex, 1);
    newBoxes.splice(destinationIndex, 0, draggedBox);
    setBoxes(newBoxes);
  };

  // insert the picture
  const handleInsertData = () => {
    
    if (attachment) {
      setLoading(true);
      const image = attachment;
      const formData = new FormData();
      formData.append("image", image);
      const url = `https://api.imgbb.com/1/upload?key=374a2c280221bdcd4696fcf7fe2f1bdd`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          // console.log(imgData)
          // console.log(imgData.data.url)
          const link = imgData?.data?.url;

          const imageLink = {
            img: link,
          };

          // Save user information to the database
          fetch("http://localhost:5000/pictures", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(imageLink),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              refetch();
              toast.success("Image Added");
              setAttachment("");
              setLoading(false);
            });
        });
    }

    console.log("final",attachment)
  };

  useEffect(()=>{
    
  },[])

  // get pictures from database
  const { refetch } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/pictures", {
        headers: {},
      });
      const data = await res.json();
      setBoxes(data);
    },
  });

  //delete images from database
  const handleDeleteImages = () => {
    console.log(selectedList);
    for (let i = 0; i < selectedList.length; i++) {
      // console.log(selectedList[i])

      const id = selectedList[i];

      fetch(`http://localhost:5000/pictures/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          refetch();
        });
    }
    setSelectedList([]);
    toast.success("The file is deleted successfully.");
  };

  return (
    <div className="lg:w-2/3 mx-auto my-5 p-2">
      {loading === true ? <Loading></Loading> : <p></p>}
      {/* title of the pages */}
      {/* <p className="text-center text-3xl font-semibold py-10">
        Assalamualikum <br /> Welcome to My Task Assesment
      </p> */}

      {/* sub title and actions for delete */}
      <div className="pb-5">
        {selectedList.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="flex justify-center items-center py-10">
              <input
                className="h-5 w-5 z-40"
                type="checkbox"
                name=""
                id=""
                defaultChecked
              />

              <p className="text-xl font-semibold my-auto px-2">
                {selectedList.length}{" "}
                {selectedList.length > 1 ? "Files" : "File"} Selected
              </p>
            </div>
            <button
              onClick={() => handleDeleteImages()}
              className="text-lg text-white font-semibold rounded-xl px-4 py-2  bg-red-400 hover:bg-red-600"
            >
              Delete {selectedList.length > 1 ? "Files" : "File"}
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl lg:text-3xl font-semibold my-10 text-center">
              Gallery
            </p>
          </div>
        )}
      </div>

      <hr />
      <br />

      {/* main gellary */}
      <div className=" grid md:grid-cols-5 gap-3">
        {boxes.map((box, index) => (
          <div
            onMouseEnter={() => setImgHover(box?._id)}
            onMouseLeave={() => setImgHover("")}
            key={box?._id}
            className={`relative cursor-pointer border-[1px] shadow-md border-gray-300 rounded-md ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            }`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("DragComponent", index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const sourceIndex = e.dataTransfer.getData("DragComponent");
              handleDragEnd(Number(sourceIndex), index);
            }}
          >
            {selectedList.find((item) => item === box?._id) ||
            imgHover === box?._id ? (
              // hover related functionality
              <div className="absolute w-full h-full opacity-40 top-0 bg-gray-400 rounded-md  z-30"></div>
            ) : (
              imgHover === box?._id && (
                <div className="absolute w-full h-full opacity-40 top-0 bg-gray-400 rounded-md  z-30"></div>
              )
            )}

            {/* main images  */}
            <img className={`w-full h-full rounded-md`} src={box?.img}></img>

            {/* selected button here */}
            {selectedList.find((item) => item === box?._id) ? (
              <input
                onClick={() => handleCheckboxChange(box?._id)}
                className="absolute cursor-pointer top-3 left-2 h-5 w-5 z-40"
                type="checkbox"
                name=""
                id=""
                checked
              />
            ) : (
              imgHover === box?._id && (
                <input
                  onClick={() => handleCheckboxChange(box?._id)}
                  className="absolute cursor-pointer top-3 left-2 h-5 w-5 z-40"
                  type="checkbox"
                  name=""
                  id=""
                />
              )
            )}
          </div>
        ))}

        {/* upload images  */}
        <div className={`${attachment ? "py-4" : "py-7"}  flex flex-col justify-center items-center border-[1px] shadow-md border-gray-300 rounded-md cursor-pointer`}>
          <label
            htmlFor="files"
            className="flex flex-col justify-center items-center cursor-pointer"
          >
            <FcAddImage className="text-4xl"></FcAddImage>
            <div className=" font-bold px-[1rem] py-[.75rem] rounded-[.25rem]">
              Add Images
            </div>
          </label>
          <input
            type="file"
            name="files"
            id="files"
            onChange={(e)=>setAttachment(e.target.files[0])}
            hidden
          />
          {
            attachment  && <p onClick={handleInsertData} className="px-4 py-2 bg-green-400 font-semibold hover:bg-green-500 rounded">Added</p>
          }
        </div>
      </div>
    </div>
  );
};

export default PictureGallery;
