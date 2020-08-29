import React, { useState } from 'react';
import * as constants from "../constants";
import axios from "axios";

function Home(props) {
    const [LinkParent, setLinkParent] = useState("");
    async function fetchFolderParent() {
        let id = LinkParent;
        if (id.endsWith("?usp=sharing")) id = id.replace("?usp=sharing", "");
        id = id.split("/").pop();

        // https://drive.google.com/drive/folders/1A9SjJ_R4g1JYf6MTW7krUeEUKgRmHQJB/?usp=sharing

        const result = await axios({
            method: 'post',
            url: constants.NodeURL,
            data: {
                link: id,
              
            }
        });
    console.log(result);

    }
    // let result = LinkParent.split("/").pop();
    return (
        <div>
            <input type="text" placeholder="link" onChange={(e) => setLinkParent(e.target.value)} ></input>
            <button onClick={fetchFolderParent}>get</button>
        </div>
    );
}

export default Home;