import React, { useState, useEffect } from 'react';
import * as constants from "../constants";
import axios from "axios";
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
            "Body (HTML)": '',
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
            result = result.data.filter(item => { return item.trashed === false }).map(item => { return { name: item.name, url: item.webContentLink } }).filter(item => { return item.name.split(".")[1] !== "psd" });

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


    let createChild = (dataChild, product) => {
        console.log(dataChild);
        console.log(product);
        let items = [];
        if (dataChild.name.split("-").length !== 2) { // neu thu muc co 2 dau - thi loi
            alert("ten thu muc chi duoc 1 dau - ");
            window.location.reload(true);
            return null;

        }
        for (let j = 0; j < product.listVariant.length; j++) {
            try {
                let mockData = {
                    "Handle": "",
                    "Title": "",
                    "Body (HTML)": '',
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
                if (j === 0) {
                    mockData = { ...product.mockData };
                    mockData["Handle"] = dataChild.name.split(" ").join("-");
                    mockData["Title"] = dataChild.name.split("-")[0];
                    mockData["Gift Card"] = "FALSE";
                }
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
                    if (product.productName === "áo 3d") {
                        if (itemProduct["Option1Value"].trim().toUpperCase() === "HOODIE")
                            mockData["Variant SKU"] = dataChild.name.split("-")[1] + "-" + "LMS" + "-" + itemProduct["Option2Value"];
                        else if (itemProduct["Option1Value"].trim().toUpperCase() === "T-SHIRT")
                            mockData["Variant SKU"] = dataChild.name.split("-")[1] + "-" + "TX" + "-" + itemProduct["Option2Value"];
                        else if (itemProduct["Option1Value"].trim().toUpperCase() === "SWEATER")
                            mockData["Variant SKU"] = dataChild.name.split("-")[1] + "-" + "WY" + "-" + itemProduct["Option2Value"];
                    }
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

        if (product.productName === "khẩu trang 1") items = itemsKhauTrang([...items], product);

        items.forEach(item => { // xóa trường gì đó, phải có
            if (item["Variant Inventory Qty"] === "") delete item["Variant Inventory Qty"]
        });

        let itemsImg = _.uniq(product.listVariant.map(item => item.NameDrive)).map(item => {
            return dataChild.data.filter(itemFilter => { return itemFilter.name.split(".")[0] === item })[0]
        }).filter(item => item !== undefined);



        itemsImg.forEach((param, key) => {
            try { // khi khai bao  giong
                items[key]["Image Position"] = key + 1;
                items[key]["Image Src"] = param.url.split("&")[0];
                // console.log(param);
            } catch (error) {
                // alert("sai roi ban")
            }

        })

        return items
    }
    useEffect(() => {
        if (folderChild.length === 0 && dataChild.length !== 0) {
            let product = props.Product.filter(item => item.productName === SelectProduct)[0];
            let items = []
            for (let i = 0; i < dataChild.length; i++) {


                items = [...items, ...createChild(dataChild[i], product)]
                // console.log(items);
            }


            if (items.filter(item => item === null).length === 0) csvDownload(items);
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
                result = result.filter(item => item.mimeType === "application/vnd.google-apps.folder" && item.trashed === false).map(item => { return { name: item.name, id: item.id } });
                setdataChild([]);
                setfolderChild(result);
            }
        }
        else {
            alert("please select product");
        }


    }

    let itemsKhauTrang = (items, product) => {
        let mockData = {
            "Handle": "",
            "Title": "",
            "Body (HTML)": '',
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
        let arrKhauTrang = [
            ["10pcs Filter", "KZDP - 10 Filter", "https://cdn.shopify.com/s/files/1/2513/0866/products/PM2.5_c97dfba6-b8ee-44c0-8118-4253352dca81.jpg"],
            ["10", "330MSTKZ- CM200401", "https://cdn.shopify.com/s/files/1/2513/0866/products/v-1567__1211021604_0d322591-4251-442e-b8fa-69f572fd7ab8.jpg"],
            ["11", "AAPTMK - Orange", "https://cdn.shopify.com/s/files/1/2513/0866/products/v-1568__398361867_689db9a0-4c6e-4ef4-ab9c-0e8544ad4611.jpg"],
            ["12", "AAPTMK - Blue", "https://cdn.shopify.com/s/files/1/2513/0866/products/v-1569__-1635293110_50f1fbe2-8a03-4ea1-9174-0025f2bd1456.jpg"],
            ["13", "AAPTMK - White", "https://cdn.shopify.com/s/files/1/2513/0866/products/v-1570__1050369133_4b68df7a-a2b3-45b1-a6e0-df31bb039ee0.jpg"],
            ["10 pcs filter", "HXTDP- 10 filters", "https://cdn.shopify.com/s/files/1/2513/0866/products/2020-04-1717.53.38_01f7887d-b0bf-41ad-95e9-8a5d715d7a02.jpg"],
            ["5", "AAMDMK - Red", "https://cdn.shopify.com/s/files/1/2513/0866/products/v-5__1132852788_fde86528-ddcc-4336-8486-ea27d38662d5.jpg"],
            ["6", "AAMDMK - Blue", "https://cdn.shopify.com/s/files/1/2513/0866/products/v-6__-892179163_d1bd8464-8c53-4ec9-9751-b50970694b46.jpg"]
        ]

        for (let i = 0; i < arrKhauTrang.length; i++) {
            let item = { ...mockData };
            item["Handle"] = items[0]["Handle"];
            item["Option1 Value"] = arrKhauTrang[i][0];
            item["Variant SKU"] = arrKhauTrang[i][1];
            item["Variant Image"] = arrKhauTrang[i][2];
            item["Variant Price"] = "24.99";
            item["Variant Compare At Price"] = "32.99";


            items.push(item);
        }

        items[0]["Variant SKU"] = "KZDP -" + items[0]["Variant SKU"]
        return items
    }
    let product = props.Product;
    let changeItemProduct = (name) => {

        let itemSelect = product.filter(item => item.productName === name)[0];
        setshowProduct({ mockData: itemSelect.mockData, show: true, name: name, list: itemSelect.listVariant });

    }
    let addProduct = () => {
        setshowProduct({
            mockData: {
                "Handle": "",
                "Title": "",
                "Body (HTML)": '',
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
                "Body (HTML)": '',
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


                {(showProduct.show === true) ? <LocalItem mockData={showProduct.mockData} Product={props.Product} name={showProduct.name} list={showProduct.list} /> : ""}


            </div>
        </React.Fragment>

    );
}

export default Home;