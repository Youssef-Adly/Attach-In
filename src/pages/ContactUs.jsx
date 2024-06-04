import React from "react";

const ContactUs = () => {
  
  return (
    <>
      {/* Header Title */}
      <h1 className="dir" style={{ color: "var(--text-main-color)" }}>
        Contact Us
      </h1>
      <hr />
      <div
        className="accordion accordion-flush mx-auto ms-sm-5 col-11"
        id="accordionFlushExample"
      >
        <div
          className="accordion-item"
          style={{ backgroundColor: "unset !important" }}
        >
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed py-2 rounded-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#section"
              aria-expanded="false"
              aria-controls="#section"
            >
              What is Attach In App
            </button>
          </h2>
          <div
            id={`section`}
            className="accordion-collapse collapse"
            // data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body dir">
              Lorem ipsum dolor sit amet consectsit amet consect etur
              adipisicing elit. Error, accusantium!
            </div>
          </div>
        </div>
      </div>
      <div className="col-10 mx-auto my-5">
        <div className="mb-3">
          {/* <label htmlFor="exampleFormControlInput1" className="form-label">
            Subject
          </label> */}
          <input
            type="email"
            className="form-control rounded-5"
            id="exampleFormControlInput1"
            placeholder="Subject"
            style={{
              bordercolor: "var(--text-main-color)",
              backgroundColor: "#eee",
            }}
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Write Your Request and will reply on you shortly
          </label> */}
          <textarea
            className="form-control rounded-5"
            id="exampleFormControlTextarea1"
            rows={6}
            placeholder="Write Your Request and will reply on you shortly"
            defaultValue={""}
            style={{
              bordercolor: "var(--text-main-color)",
              backgroundColor: "#eee",
            }}
          />
        </div>
        <input
          type="submit"
          value={"Send"}
          style={{
            backgroundColor: "var(--main-color)",
            height: "100px",
            width: "100px",
          }}
          className="mx-auto border-0 text-decoration-none text-light rounded rounded-circle d-flex justify-content-center align-items-center fs-5"
        />
      </div>
    </>
  );
};

export default ContactUs;
