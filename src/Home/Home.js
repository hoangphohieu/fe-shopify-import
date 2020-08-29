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

        let result = await axios({
            method: 'post',
            url: constants.NodeURL,
            data: {
                link: id,

            }
        });
        result = result.data

        if (result.length === 0) alert("kiem tra lai url")
        else {
            result = result.filter(item => item.mimeType === "application/vnd.google-apps.folder").map(item=>{return {name:item.name,id:item.id}});

        }
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