import React, {FunctionComponent} from "react";

import "./scss/index.scss";

const classPrefix = "mdb-app";

export const App: FunctionComponent = () => {
    return (
        <div className={classPrefix}>
            app
        </div>
    );
}
