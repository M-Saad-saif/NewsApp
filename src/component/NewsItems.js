  import React from "react";

  const NewItems = (props) => {
    let { title, description, imgUrl, newsUrl, author, date, source } = props;

    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              imgUrl
                ? imgUrl
                : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <span className="position-absolute my-2  top-0 start-100  translate-middle badge rounded-pill bg-danger" style={{ justifySelf: "anchor-center" }}>
              
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>

            <h5 className="card-title">{title}....</h5>

            <p className="card-text">
              {description ? description : "NO DESCRIPTION"}....
              <i>Click below for more detail</i>
            </p>

            <p className="card-text">
              <small className="text-muted">
                By <i>{author ? author : "Unknown"}</i> on
                {new Date(date).toGMTString()}
              </small>
            </p>

            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              More Details
            </a>
          </div>
        </div>
      </>
    );
  };
  export default NewItems;
