import { useState } from "react";
import PropTypes from "prop-types";
import { FcAddImage } from "react-icons/fc";
import Loading from "../Common/loading";

const DragAndDrop = ({
  boxes,
  selectedList,
  setBoxes,
  setAttachment,
  attachment,
  handleInsertData,
  handleCheckboxChange,
  loading,
}) => {
  const [imgHover, setImgHover] = useState("");

  const handleDragEnd = (sourceIndex, destinationIndex) => {
    const newBoxes = [...boxes];
    const [draggedBox] = newBoxes.splice(sourceIndex, 1);
    newBoxes.splice(destinationIndex, 0, draggedBox);
    setBoxes(newBoxes);
  };

  return (
    <div>
      {boxes.length > 0 ? (
        <div className=" grid md:grid-cols-5 gap-3">
          {boxes?.map((box, index) => (
            <div
              onMouseEnter={() => setImgHover(box?._id)}
              onMouseLeave={() => setImgHover("")}
              key={box?._id}
              className={`relative cursor-pointer border-[1px] shadow-md border-gray-300 rounded-md ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("DragComponent", index)
              }
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

          {/*---------------- upload images ---------------  */}
          <div
            className={`${
              attachment ? "py-4" : "py-12"
            }  flex flex-col justify-center items-center border-[1px] border-dashed shadow-md border-gray-300 rounded-md cursor-pointer bg-white`}
          >
            <label
              htmlFor="files"
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <FcAddImage className="text-6xl"></FcAddImage>
            </label>
            <input
              type="file"
              name="files"
              id="files"
              onChange={(e) => setAttachment(e.target.files[0])}
              hidden
            />
            {attachment && (
              <p
                onClick={handleInsertData}
                className="px-4 py-2 bg-blue-500 font-semibold hover:bg-blue-500 rounded my-4"
              >
                {loading === true ? <Loading></Loading> : "Add Image"}
              </p>
            )}
          </div>
        </div>
      ) : (
        // if -------------------- images data it empty -------------
        <div>
          <p className="text-2xl text-center font-semibold py-5">
            Please Upload Pictures...
          </p>
          {/* upload images  */}
          <div
            className={`${
              attachment ? "py-4" : "py-12"
            }  flex flex-col justify-center items-center border-[1px] border-dashed shadow-md border-gray-300 rounded-md cursor-pointer bg-white`}
          >
            <label
              htmlFor="files"
              className="flex flex-col justify-center items-center cursor-pointer"
            >
              <FcAddImage className="text-6xl"></FcAddImage>
            </label>
            <input
              type="file"
              name="files"
              id="files"
              onChange={(e) => setAttachment(e.target.files[0])}
              hidden
            />
            {attachment && (
              <p
                onClick={handleInsertData}
                className="px-4 py-2 bg-bule-500 font-semibold hover:bg-bule-600 rounded my-4"
              >
                {loading === true ? <Loading></Loading> : "Add Image"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;

DragAndDrop.propTypes = {
  boxes: PropTypes.element.any,
  selectedList: PropTypes.element.any,
  setBoxes: PropTypes.element.any,
  setAttachment: PropTypes.element.any,
  attachment: PropTypes.element.any,
  handleInsertData: PropTypes.element.any,
  handleCheckboxChange: PropTypes.element.any,
  loading: PropTypes.element.any,
};
