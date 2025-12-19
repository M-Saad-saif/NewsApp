import React, { Component } from "react";

export default class NewItems extends Component {
  render() {
    let { title, description, imgUrl, newsUrl } = this.props;

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
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">
              {description ? description : "NO DESCRIPTION"}.... <i>Click below for more detail</i>
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
  }
}
