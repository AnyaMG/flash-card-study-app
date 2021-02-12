import React from "react";
import { Link } from "react-router-dom";

function CardList(props) {
  return (
    <div class="card">
      <div class="card-body">
        <div class="container">
          <div class="row justify-content-start">
            <div class="col-4">{props.front}</div>

            <div class="col-4">{props.back}</div>

            <div class="col-4">
              <Link to="#" class="btn btn-secondary">
                Edit
              </Link>
              <Link to="#" class="btn btn-danger">
                <span className="oi oi-trash" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardList;
