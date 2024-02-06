import React from "react";
import {faSquareMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RemovePoint = () => {

    return (
        <FontAwesomeIcon
            icon={faSquareMinus}
            size="2xl"
            className="remove-point-icon"
        />
    );
};

export default RemovePoint;