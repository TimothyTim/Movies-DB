import classNames from "classnames";
import React, { FunctionComponent } from "react";

import "./Container.scss";

const classPrefix = "mdb-container";

export interface IContainerProps {
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | boolean;
}

export const Container: FunctionComponent<IContainerProps> = ({
    maxWidth = false,
    children,
}) => {
    return (
        <div
            className={classNames(classPrefix, {
                [`${classPrefix}--max-width-${maxWidth}`]: maxWidth && maxWidth !== true,
            })}
        >
            {children}
        </div>
    );
};
