import React, { useState, useEffect } from 'react';
import * as constants from "../constants";
import axios from "axios";

function Home(props) {
    const [LinkParent, setLinkParent] = useState("");
    const [folderChild, setfolderChild] = useState([]);
    const [dataChild, setdataChild] = useState([]);
    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            let result = await axios({
                method: 'post',
                url: constants.FetchDrive,
                data: {
                    link: folderChild[0].id
                }
            });
            result = result.data.map(item => { return { name: item.name, url: item.webContentLink } });
            if (!ignore) {
                setdataChild([...dataChild, { name: folderChild[0].name, data: result }]);
                let folderChild2 = folderChild;
                folderChild2.shift();
                setfolderChild([...folderChild, ...folderChild2]);
            };
        }
        if (folderChild.length > 0) fetchData();
        return () => { ignore = true; }
    }, [folderChild]);


    async function fetchFolderParent() { // fetch folder tổng
        let id = LinkParent;
        if (id.endsWith("?usp=sharing")) id = id.replace("?usp=sharing", "");
        id = id.split("/").pop();
        let result = await axios({
            method: 'post',
            url: constants.FetchDrive,
            data: {
                link: id
            }
        });
        result = result.data

        if (result.length === 0) alert("kiem tra lai url")
        else {
            result = result.filter(item => item.mimeType === "application/vnd.google-apps.folder").map(item => { return { name: item.name, id: item.id } });
            setdataChild([]);
            setfolderChild(result);
        }


    }
    console.log(dataChild);

    return (
        <div>
            <input type="text" placeholder="link" onChange={(e) => setLinkParent(e.target.value)} ></input>
            <button onClick={fetchFolderParent}>get</button>
        </div>
    );
}

export default Home;