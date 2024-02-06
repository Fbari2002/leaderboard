import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";

const AddPoint = () => {
    return (
        <FontAwesomeIcon
            icon={faSquarePlus}
            size="2xl"
            className="add-point-icon"
        />
    );
};

export default AddPoint;