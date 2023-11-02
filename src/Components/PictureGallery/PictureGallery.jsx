import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../Common/loading";
import DragAndDrop from "./DragAndDrop";

const PictureGallery = () => {
  const [boxes, setBoxes] = useState([]);
  const [attachment, setAttachment]= useState(null);
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(false);

  
    //---------------------------- get pictures from database
    const { refetch } = useQuery({
      queryFn: async () => {
        const res = await fetch("http://localhost:5000/pictures", {
          headers: {},
        });
        const data = await res.json();
        setBoxes(data);
      },
    });
 


  //------------------------------------- insert the picture-----------------------
  const handleInsertData = () => {
    
    if (attachment) {
      // console.log("uploadin start");
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
          // console.log("Uploaded",imgData)
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
              result
              // console.log(result);
              refetch();
              toast.success("Image Added");
              setAttachment("");
              setLoading(false);
            });
        });
    }
    else{
      toast.error("Opps! Someting is wrong. Try again...");
    }

  };

  

  //------------------------------delete images from database------------------
  const handleDeleteImages = () => {
    // console.log(selectedList);
    setLoading(true);
    for (let i = 0; i < selectedList.length; i++) {
      // console.log(selectedList[i])

      const id = selectedList[i];

      fetch(`http://localhost:5000/pictures/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          data
          refetch();
        });
    }
    setSelectedList([]);
    toast.success("The file is deleted successfully.");
    setLoading(false);
  };



  //------------------------------Selected Images------------------
  const handleCheckboxChange = (id) => {
    if(id === -1){
      setSelectedList([]);
    }
    else if (selectedList.find((item) => item === id)) {
      let newList = selectedList.filter((item) => item !== id);
      setSelectedList(newList);
    } else {
      setSelectedList([...selectedList, id]);
    }
  };


  return (
    <div className="lg:w-2/3 bg-gray-100 rounded mx-auto my-5 p-2">
      {loading === true ? <Loading></Loading> : <p></p>}
    

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
                onClick={()=> handleCheckboxChange(-1)}
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

      {/*------------------------- main gellary ------------------------*/}
      <div>
          {/*------------------ drag and drop component ----------------*/}
        <DragAndDrop 
        boxes={boxes} 
        setBoxes={setBoxes}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        setAttachment={setAttachment}
        attachment={attachment}
        handleInsertData={handleInsertData}
        handleCheckboxChange={handleCheckboxChange}
        loading={loading}
        ></DragAndDrop>
        
      </div>
    </div>
  );
};

export default PictureGallery;
