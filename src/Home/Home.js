import React, { useState, useEffect } from 'react';
import * as constants from "../constants";
import axios from "axios";
// import CsvDownload from "react-json-to-csv";
import csvDownload from 'json-to-csv-export';
import _ from "lodash";
import LocalItem from './LocalItem';
function Home(props) {
    const [LinkParent, setLinkParent] = useState("");
    const [folderChild, setfolderChild] = useState([]);
    const [dataChild, setdataChild] = useState([]);
    const [SelectProduct, setSelectProduct] = useState(null);
    const [showProduct, setshowProduct] = useState({
        mockData: {
            "Handle": "",
            "Title": "",
            "Body (HTML)": "",
            "Vendor": "",
            "Type": "",
            "Tags": "",
            "Published": "",
            "Option1 Name": "",
            "Option1 Value": "",
            "Option2 Name": "",
            "Option2 Value": "",
            "Option3 Name": "",
            "Option3 Value": "",
            "Variant SKU": "",
            "Variant Grams": "",
            "Variant Inventory Tracker": "",
            "Variant Inventory Qty": null,
            "Variant Inventory Policy": "deny",
            "Variant Fulfillment Service": "manual",
            "Variant Price": "",
            "Variant Compare At Price": "",
            "Variant Requires Shipping": "TRUE",
            "Variant Taxable": "TRUE",
            "Variant Barcode": "",
            "Image Src": "",
            "Image Position": "",
            "Image Alt Text": "",
            "Gift Card": "FALSE",
            "SEO Title": "",
            "SEO Description": "",
            "Google Shopping / Google Product Category": "",
            "Google Shopping / Gender": "",
            "Google Shopping / Age Group": "",
            "Google Shopping / MPN": "",
            "Google Shopping / AdWords Grouping": "",
            "Google Shopping / AdWords Labels": "",
            "Google Shopping / Condition": "",
            "Google Shopping / Custom Product": "",
            "Google Shopping / Custom Label 0": "",
            "Google Shopping / Custom Label 1": "",
            "Google Shopping / Custom Label 2": "",
            "Google Shopping / Custom Label 3": "",
            "Google Shopping / Custom Label 4": "",
            "Variant Image": "",
            "Variant Weight Unit": "",
            "Variant Tax Code": "",
            "Cost per item": ""
        }
        , show: false, list: []
    });
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
            result = result.data.filter(item=>{return item.trashed===false}).map(item => { return { name: item.name, url: item.webContentLink } });
            
            if (!ignore) {
                setdataChild([...dataChild, { name: folderChild[0].name, data: result }]);
                let folderChild2 = folderChild;
                folderChild2.shift();
                setfolderChild([...folderChild2]);
            };
        }
        // console.log(folderChild);
        // console.log(dataChild);
        if (folderChild.length > 0) fetchData();
        return () => { ignore = true; }
    }, [folderChild]);
    // console.log(showProduct);

    let createChild = (dataChild, product) => {
        console.log(dataChild);
        console.log(product);
        let items = [];
        if (dataChild.name.split("-").length !== 2) { // neu thu muc co 2 dau - thi loi
            alert("ten thu muc chi duoc 1 dau - ");
            window.location.reload(true);

        }

        {// item dau tien
            let item = { ...product.mockData };
            let itemFirst = product.listVariant[0];
            item["Handle"] = dataChild.name.split(" ").join("-");
            item["Title"] = dataChild.name.split("-")[0];
            item["Variant Image"] = dataChild.data.filter(param => { return param.name.split(".")[0] === itemFirst.NameDrive })[0].url.split("&")[0];
            let itemProduct = product.listVariant[0];
            console.log(itemProduct);
            item["Option1 Value"] = itemProduct.Option1Value;
            item["Option2 Value"] = itemProduct.Option2Value;
            item["Option3 Value"] = itemProduct.Option3Value;
            item["Variant Compare At Price"] = itemProduct.VariantCompareAtPrice;
            item["Variant Inventory Qty"] = itemProduct.VariantInventoryQty;
            item["Variant Price"] = itemProduct.VariantPrice;
            // item["Variant SKU"] = itemProduct.VariantSKU;
            item["Gift Card"] = "FALSE";
            item["Variant SKU"] = dataChild.name.split("-")[1];
            if (product.mockData["Option2 Name"] !== "") {

                if (itemProduct["Option1Value"].trim().toUpperCase() === "HOODIE")
                    item["Variant SKU"] = dataChild.name.split("-")[1].trim() + "-" + "LMS" + "-" + itemProduct["Option2Value"];
                else if (itemProduct["Option1Value"].trim().toUpperCase() === "T-SHIRT")
                    item["Variant SKU"] = dataChild.name.split("-")[1].trim() + "-" + "TX" + "-" + itemProduct["Option2Value"];
                else if (itemProduct["Option1Value"].trim().toUpperCase() === "SWEATER")
                    item["Variant SKU"] = dataChild.name.split("-")[1].trim() + "-" + "WY" + "-" + itemProduct["Option2Value"];
            }
            items.push(item);

        }
        console.log(product.listVariant);
        for (let j = 1; j < product.listVariant.length; j++) {
            let mockData = {
                "Handle": "",
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Type": "",
                "Tags": "",
                "Published": "",
                "Option1 Name": "",
                "Option1 Value": "",
                "Option2 Name": "",
                "Option2 Value": "",
                "Option3 Name": "",
                "Option3 Value": "",
                "Variant SKU": "",
                "Variant Grams": "",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": null,
                "Variant Inventory Policy": "deny",
                "Variant Fulfillment Service": "manual",
                "Variant Price": "",
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Barcode": "",
                "Image Src": "",
                "Image Position": "",
                "Image Alt Text": "",
                "Gift Card": "",
                "SEO Title": "",
                "SEO Description": "",
                "Google Shopping / Google Product Category": "",
                "Google Shopping / Gender": "",
                "Google Shopping / Age Group": "",
                "Google Shopping / MPN": "",
                "Google Shopping / AdWords Grouping": "",
                "Google Shopping / AdWords Labels": "",
                "Google Shopping / Condition": "",
                "Google Shopping / Custom Product": "",
                "Google Shopping / Custom Label 0": "",
                "Google Shopping / Custom Label 1": "",
                "Google Shopping / Custom Label 2": "",
                "Google Shopping / Custom Label 3": "",
                "Google Shopping / Custom Label 4": "",
                "Variant Image": "",
                "Variant Weight Unit": "",
                "Variant Tax Code": "",
                "Cost per item": ""
            }
            try {
            mockData["Handle"] = dataChild.name.split(" ").join("-");
            mockData["Variant Image"] = dataChild.data.filter(param => { return param.name.split(".")[0] === product.listVariant[j].NameDrive })[0].url.split("&")[0];
            let itemProduct = product.listVariant[j];
            if (itemProduct.Option1Value !== "") {
                mockData["Option1 Value"] = itemProduct.Option1Value;
                mockData["Option2 Value"] = itemProduct.Option2Value;
                mockData["Option3 Value"] = itemProduct.Option3Value;
                mockData["Variant Compare At Price"] = itemProduct.VariantCompareAtPrice;
                mockData["Variant Inventory Qty"] = itemProduct.VariantInventoryQty;
                mockData["Variant Price"] = itemProduct.VariantPrice;
                mockData["Variant SKU"] = dataChild.name.split("-")[1];

                if (product.mockData["Option2 Name"] !== "") {
                    console.log(itemProduct["Option1Value"]);
                    console.log(dataChild.name.split("-")[1]);
                    if (itemProduct["Option1Value"].trim().toUpperCase() === "HOODIE")
                        mockData["Variant SKU"] = dataChild.name.split("-")[1] + "-" + "LMS" + "-" + itemProduct["Option2Value"];
                    else if (itemProduct["Option1Value"].trim().toUpperCase() === "T-SHIRT")
                        mockData["Variant SKU"] = dataChild.name.split("-")[1] + "-" + "TX" + "-" + itemProduct["Option2Value"];
                    else if (itemProduct["Option1Value"].trim().toUpperCase() === "SWEATER")
                        mockData["Variant SKU"] = dataChild.name.split("-")[1] + "-" + "WY" + "-" + itemProduct["Option2Value"];
                }
                console.log(mockData);

                items.push(mockData);
            }
            else {
                mockData["Variant Image"] = "";
                mockData["Variant Inventory Policy"] = "";
                mockData["Variant Fulfillment Service"] = "";
                mockData["Variant Requires Shipping"] = "";
                mockData["Variant Taxable"] = "";
                items.push(mockData);
            }

            } catch (error) {
                // alert("khai bao tendrive khong dung")
            }


        }
        items.forEach(item => {
            if (item["Variant Inventory Qty"] === "") delete item["Variant Inventory Qty"]
        });

        let itemsImg = dataChild.data.filter(param => { return !isNaN(param.name.split(".")[0]) });
        itemsImg = _.sortBy(itemsImg, [function (o) { return Number(o.name.split(".")[0]) }]);
        console.log(itemsImg);
        itemsImg.forEach((param, key) => {
            try { // khi khai bao  giong
                items[key]["Image Position"] = param.name.split(".")[0];
                items[key]["Image Src"] = param.url.split("&")[0];
            } catch (error) {
                // alert("sai roi ban")
            }

        })
        // console.log(itemsImg);
        return items
    }
    useEffect(() => {
        if (folderChild.length === 0 && dataChild.length !== 0) {
            let product = JSON.parse(localStorage.product).filter(item => item.productName === SelectProduct)[0];
            let items = []
            for (let i = 0; i < dataChild.length; i++) {


                items = [...items, ...createChild(dataChild[i], product)]
                // console.log(items);
            }
            csvDownload(items);
            setdataChild([]);
        }
    });

    async function fetchFolderParent() { // fetch folder tổng
        if (SelectProduct !== null) {
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
                result = result.filter(item => item.mimeType === "application/vnd.google-apps.folder"&& item.trashed===false).map(item => { return { name: item.name, id: item.id } });
                setdataChild([]);
                setfolderChild(result);
            }
        }
        else {
            alert("please select product")
        }


    }

    if (localStorage.product === undefined) localStorage.product = JSON.stringify([]);
    let product = JSON.parse(localStorage.product);
    let changeItemProduct = (name) => {
        // const [showProduct, setshowProduct] = useState({ name: null, show: false });
        let itemSelect = JSON.parse(localStorage.product).filter(item => item.productName === name)[0];
        setshowProduct({ mockData: itemSelect.mockData, show: true, name: name, list: itemSelect.listVariant });

    }
    let addProduct = () => {
        setshowProduct({
            mockData: {
                "Handle": "",
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Type": "",
                "Tags": "",
                "Published": "",
                "Option1 Name": "",
                "Option1 Value": "",
                "Option2 Name": "",
                "Option2 Value": "",
                "Option3 Name": "",
                "Option3 Value": "",
                "Variant SKU": "",
                "Variant Grams": "",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": null,
                "Variant Inventory Policy": "deny",
                "Variant Fulfillment Service": "manual",
                "Variant Price": "",
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Barcode": "",
                "Image Src": "",
                "Image Position": "",
                "Image Alt Text": "",
                "Gift Card": "FALSE",
                "SEO Title": "",
                "SEO Description": "",
                "Google Shopping / Google Product Category": "",
                "Google Shopping / Gender": "",
                "Google Shopping / Age Group": "",
                "Google Shopping / MPN": "",
                "Google Shopping / AdWords Grouping": "",
                "Google Shopping / AdWords Labels": "",
                "Google Shopping / Condition": "",
                "Google Shopping / Custom Product": "",
                "Google Shopping / Custom Label 0": "",
                "Google Shopping / Custom Label 1": "",
                "Google Shopping / Custom Label 2": "",
                "Google Shopping / Custom Label 3": "",
                "Google Shopping / Custom Label 4": "",
                "Variant Image": "",
                "Variant Weight Unit": "",
                "Variant Tax Code": "",
                "Cost per item": ""
            }
            , show: true, name: "", list: []
        });
    }
    let closeModalProduct = () => {
        setshowProduct({
            mockData: {
                "Handle": "",
                "Title": "",
                "Body (HTML)": "",
                "Vendor": "",
                "Type": "",
                "Tags": "",
                "Published": "",
                "Option1 Name": "",
                "Option1 Value": "",
                "Option2 Name": "",
                "Option2 Value": "",
                "Option3 Name": "",
                "Option3 Value": "",
                "Variant SKU": "",
                "Variant Grams": "",
                "Variant Inventory Tracker": "",
                "Variant Inventory Qty": null,
                "Variant Inventory Policy": "deny",
                "Variant Fulfillment Service": "manual",
                "Variant Price": "",
                "Variant Compare At Price": "",
                "Variant Requires Shipping": "TRUE",
                "Variant Taxable": "TRUE",
                "Variant Barcode": "",
                "Image Src": "",
                "Image Position": "",
                "Image Alt Text": "",
                "Gift Card": "FALSE",
                "SEO Title": "",
                "SEO Description": "",
                "Google Shopping / Google Product Category": "",
                "Google Shopping / Gender": "",
                "Google Shopping / Age Group": "",
                "Google Shopping / MPN": "",
                "Google Shopping / AdWords Grouping": "",
                "Google Shopping / AdWords Labels": "",
                "Google Shopping / Condition": "",
                "Google Shopping / Custom Product": "",
                "Google Shopping / Custom Label 0": "",
                "Google Shopping / Custom Label 1": "",
                "Google Shopping / Custom Label 2": "",
                "Google Shopping / Custom Label 3": "",
                "Google Shopping / Custom Label 4": "",
                "Variant Image": "",
                "Variant Weight Unit": "",
                "Variant Tax Code": "",
                "Cost per item": ""
            }
            , show: false, name: "", list: []
        })
    }
    return (
        <React.Fragment>

            <div className="container ctn-app">
                <div className="row">
                    {product.map((item, key) => <div className={"col-3 namepro" + ((SelectProduct === item.productName) ? " select-pro" : "")} key={key} onClick={() => setSelectProduct(item.productName)}>
                        {item.productName}
                        <div onClick={() => changeItemProduct(item.productName)} className="more-info">
                            v
                        </div>
                    </div>)}
                    <div className="col-3" onClick={addProduct} >Add Product</div>

                </div>



                <div className="get-link">
                    <input type="text" placeholder="link" onChange={(e) => setLinkParent(e.target.value)} ></input>
                    <button onClick={fetchFolderParent} className="ml-2">get</button>


                </div>
                {(showProduct.show === true) ? <button onClick={closeModalProduct} className="modal-closse">X</button> : ""}


                {(showProduct.show === true) ? <LocalItem mockData={showProduct.mockData} name={showProduct.name} list={showProduct.list} /> : ""}


            </div>
        </React.Fragment>

    );
}

export default Home;