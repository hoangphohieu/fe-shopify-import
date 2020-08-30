import React, { useState, useEffect } from 'react';
import * as constants from "../constants";
import axios from "axios";
// import CsvDownload from "react-json-to-csv";
import csvDownload from 'json-to-csv-export';
import _, { toLower, concat } from "lodash";
function Home(props) {
    const [LinkParent, setLinkParent] = useState("");
    const [folderChild, setfolderChild] = useState([]);
    const [dataChild, setdataChild] = useState([]);
    const [SelectProduct, setSelectProduct] = useState("");
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
        // console.log(folderChild);
        if (folderChild.length > 0) fetchData();
        return () => { ignore = true; }
    }, [folderChild]);
    // console.log(dataChild);

    let createChild = (dataChild, product) => {
        console.log(dataChild);
        console.log(product);
        let items = [];
        {// item dau tien
            let item = { ...product.mockData };

            item["Handle"] = item["Handle"] + dataChild.name.split(" ").join("-");

            item["Image Position"] = dataChild.data[0].name.split(".")[0];
            item["Image Src"] = dataChild.data[0].url.split("&")[0];
            item["Variant Image"] = dataChild.data[0].url.split("&")[0];
            let itemProduct = product.listVariant.filter(item => item.NameDrive === dataChild.data[0].name.split(".")[0])[0];
            item["Option1 Value"] = itemProduct.Option1Value;
            item["Option2 Value"] = itemProduct.Option2Value;
            item["Option3 Value"] = itemProduct.Option3Value;
            item["Variant Compare At Price"] = itemProduct.VariantCompareAtPrice;
            item["Variant Inventory Qty"] = itemProduct.VariantInventoryQty;
            item["Variant Price"] = itemProduct.VariantPrice;
            item["Variant SKU"] = itemProduct.VariantSKU;
            items.push(item);

        }
        for (let j = 1; j < dataChild.data.length; j++) {
            let mockData = { ...product.mockData }
            let imgDrive = dataChild.data[j];
            mockData["Handle"] = product.mockData.Handle + dataChild.name.split(" ").join("-");
            mockData["Image Position"] = imgDrive.name.split(".")[0];
            mockData["Image Src"] = imgDrive.url.split("&")[0];
            mockData["Variant Image"] = imgDrive.url.split("&")[0];
            console.log(mockData);

            let variant = product.listVariant.filter(item => item.NameDrive === mockData["Image Position"])[0];
            mockData["Option1 Value"] = variant.Option1Value;
            mockData["Option2 Value"] = variant.Option2Value;
            mockData["Option3 Value"] = variant.Option3Value;
            mockData["Variant Compare At Price"] = variant.VariantCompareAtPrice;
            mockData["Variant Inventory Qty"] = variant.VariantInventoryQty;
            mockData["Variant Price"] = variant.VariantPrice;
            mockData["Variant SKU"] = variant.VariantSKU;
            items.push(mockData);
        }
        items.forEach(item => {
            if (item["Variant Inventory Qty"] === "") delete item["Variant Inventory Qty"]
        });
        return items
    }
    useEffect(() => {
        if (folderChild.length === 0 && dataChild.length !== 0) {
            let product = JSON.parse(localStorage.product).filter(item => item.productName === SelectProduct)[0];
            for (let i = 0; i < dataChild.length; i++) {

                csvDownload(createChild(dataChild[i], product));

            }
            setdataChild([]);

            // csvDownload(mockData);
            // setdataChild([]);
        }
    });

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

    if (localStorage.product === undefined) localStorage.product = JSON.stringify([]);
    let product = JSON.parse(localStorage.product);
    // console.log(product);
    return (
        <React.Fragment>

            <div className="container">
                <div className="row">
                    {product.map((item, key) => <div className="col-4" key={key} onClick={() => setSelectProduct(item.productName)}>
                        {item.productName}
                    </div>)}

                </div>
            </div>


            <div>
                <input type="text" placeholder="link" onChange={(e) => setLinkParent(e.target.value)} ></input>
                <button onClick={fetchFolderParent}>get</button>
            </div>
        </React.Fragment>

    );
}

export default Home;