import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Add = () => {
  const [step, setStep] = useState(1);
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);


  const currentUser=JSON.parse(localStorage.getItem("currentUser"));
  let initialState={username:currentUser.username}
 const [state, dispatch] = useReducer(gigReducer, initialState);
  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    // navigate("/mygigs")
  };

  const renderStep1 = () => {
    return (

      <div className="info">
        <h3>Raise Investment</h3>
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. I will do something I'm really good at"
          onChange={handleChange}
        />
        <label htmlFor="">Category/Niche of your content</label>
        <select name="cat" id="cat" onChange={handleChange}>
          <option value="design">Design</option>
          <option value="Health">Health</option>
          <option value="Tech">Tech</option>
          <option value="Style">Style</option>
          <option value="web">Web Development</option>
          <option value="animation">Animation</option>
          <option value="music">Music</option>
        </select>
        <div className="images">
          <div className="imagesInputs">
            <label htmlFor="">Cover Image</label>
            <input
              type="file"
              onChange={(e) => setSingleFile(e.target.files[0])}
            />
            <label htmlFor="">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>
          <button onClick={handleUpload}>
            {uploading ? "uploading" : "Upload"}
          </button>
        </div>
        <label htmlFor="">Something to say for potential fan investors</label>
        <textarea
          name="desc"
          id=""
          placeholder="Brief descriptions to introduce your service to customers"
          cols="0"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <button onClick={() => setStep(step + 1)}>Next</button>
      </div>
    );
  }

  const renderStep2 = () => {
    return (
      <div className="details">
        <h3>Raise Investment</h3>
        <label htmlFor="">Channel Id</label>
        <input
          type="text"
          name="channel"
          placeholder="6382638"
          onChange={handleChange}
        />
        {/* <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
            ></textarea> */}
        <label htmlFor="">Vesting period (in months)</label>
        <input type="number" name="vestingTime" onChange={handleChange} />
        <label htmlFor="">Average revenue(per month) </label>
        <input
          type="number"
          name="revenue"
          onChange={handleChange}
        />
        <label htmlFor="">Add terms for return to investors</label>
        <form action="" className="add" onSubmit={handleFeature}>
          <input type="text" placeholder="e.g. page design" />
          <button type="submit">add</button>
        </form>
        <div className="addedFeatures">
          {state?.features?.map((f) => (
            <div className="item" key={f}>
              <button
                onClick={() =>
                  dispatch({ type: "REMOVE_FEATURE", payload: f })
                }
              >
                {f}
                <span>X</span>
              </button>
            </div>
          ))}
        </div>
        <label htmlFor="">Maximum investors</label>
        <input type="number" onChange={handleChange} name="max" />
        <button onClick={() => setStep(step - 1)}>Back</button>
        <button onClick={handleSubmit}>Create</button>
      </div>
    )
  }


  //   return (
  //     <div className="add">
  //       <div className="container">
  //         <h1>Start a new funding campaign</h1>

  //         <div className="sections">
  //           <div className="info">
  //             <label htmlFor="">Title</label>
  //             <input
  //               type="text"
  //               name="title"
  //               placeholder="e.g. I will do something I'm really good at"
  //               onChange={handleChange}
  //             />
  //             <label htmlFor="">Category/Niche of your content</label>
  //             <select name="cat" id="cat" onChange={handleChange}>
  //               <option value="design">Design</option>
  //               <option value="web">Web Development</option>
  //               <option value="animation">Animation</option>
  //               <option value="music">Music</option>
  //             </select>
  //             <div className="images">
  //               <div className="imagesInputs">
  //                 <label htmlFor="">Cover Image</label>
  //                 <input
  //                   type="file"
  //                   onChange={(e) => setSingleFile(e.target.files[0])}
  //                 />
  //                 <label htmlFor="">Upload Images</label>
  //                 <input
  //                   type="file"
  //                   multiple
  //                   onChange={(e) => setFiles(e.target.files)}
  //                 />
  //               </div>
  //               <button onClick={handleUpload}>
  //                 {uploading ? "uploading" : "Upload"}
  //               </button>
  //             </div>
  //             <label htmlFor="">Something to say for potential fan investors</label>
  //             <textarea
  //               name="desc"
  //               id=""
  //               placeholder="Brief descriptions to introduce your service to customers"
  //               cols="0"
  //               rows="16"
  //               onChange={handleChange}
  //             ></textarea>
  //             <button onClick={handleSubmit}>Create</button>
  //           </div>
  //           <div className="details">
  //             <label htmlFor="">Channel Title</label>
  //             <input
  //               type="text"
  //               name="shortTitle"
  //               placeholder="e.g. One-page web design"
  //               onChange={handleChange}
  //             />
  //             <label htmlFor="">Short Description</label>
  //             <textarea
  //               name="shortDesc"
  //               onChange={handleChange}
  //               id=""
  //               placeholder="Short description of your service"
  //               cols="30"
  //               rows="10"
  //             ></textarea>
  //             <label htmlFor="">Vesting period (in months)</label>
  //             <input type="number" name="deliveryTime" onChange={handleChange} />
  //             <label htmlFor="">Target revenue </label>
  //             <input
  //               type="number"
  //               name="revisionNumber"
  //               onChange={handleChange}
  //             />
  //             <label htmlFor="">Add terms for return to investors</label>
  //             <form action="" className="add" onSubmit={handleFeature}>
  //               <input type="text" placeholder="e.g. page design" />
  //               <button type="submit">add</button>
  //             </form>
  //             <div className="addedFeatures">
  //               {state?.features?.map((f) => (
  //                 <div className="item" key={f}>
  //                   <button
  //                     onClick={() =>
  //                       dispatch({ type: "REMOVE_FEATURE", payload: f })
  //                     }
  //                   >
  //                     {f}
  //                     <span>X</span>
  //                   </button>
  //                 </div>
  //               ))}
  //             </div>
  //             <label htmlFor="">Amount Raising</label>
  //             <input type="number" onChange={handleChange} name="price" />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  switch (step) {

    case 1:
      return renderStep1();
    case 2:
      return renderStep2();
    default:
      return null;
  }
}
export default Add;